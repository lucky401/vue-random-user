<template>
  <v-card flat>
    <v-card-title> Example With Search and Filter </v-card-title>
    <v-card-subtitle class="d-sm-flex align-center justify-start mt-0">
      <v-sheet class="mr-sm-2 my-2" :width="isBreakpointXs ? '100%' : ''">
        <search-input-component
          placeholder="Find Users . . ."
          v-model="innerFilter.search"
        />
      </v-sheet>
      <v-sheet :width="isBreakpointXs ? '100%' : '190px'" class="mr-md-4 my-2">
        <filter-input-component
          v-model="innerFilter.gender"
          item-text="label"
          item-value="value"
          placeholder="Gender"
          :options="genderOptions"
          :search.sync="searchGenderOptions"
        />
      </v-sheet>
      <v-btn
        height="40"
        elevation="0"
        class="my-2 text-capitalize"
        outlined
        :block="isBreakpointXs"
        @click="handleResetFilter"
      >
        Reset Filter
      </v-btn>
    </v-card-subtitle>
    <v-card-text v-if="status !== 'rejected'">
      <table-skeleton-loading-indicator-component
        :is-loading="status === 'pending'"
      >
        <table-user-list-component
          :items="users"
          :sort-by.sync="sort.sortBy"
          :sort-desc.sync="sort.sortDesc"
        />
      </table-skeleton-loading-indicator-component>
      <data-not-found-component
        v-if="status === 'resolved' && users.length < 1"
      />
    </v-card-text>
    <v-card-actions class="pb-6 px-6" v-if="status === 'resolved'">
      <v-container fluid>
        <v-row>
          <v-col v-if="users.length > 0" cols="5" class="d-none d-md-block">
            <span class="body-2 font-weight-bold mt-4">
              Total {{ totalData }} data
            </span>
          </v-col>
          <v-col cols="12" md="7">
            <v-pagination
              circle
              :value="page"
              :length="500"
              color="info"
              :total-visible="5"
              class="float-sm-right"
              @input="changePageHandler"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card-actions>
    <v-card-text v-if="status === 'rejected'">
      <module-error-component :error-message="errorMessage" />
    </v-card-text>
  </v-card>
</template>

<script>
import debounce from 'lodash.debounce';

import VuexModule from '@/utils/vuex';

import * as ROOTTYPES from '@/store-namespace/root/types';
import * as USERTYPES from '../../store/types';

const rootModule = VuexModule(ROOTTYPES.MODULE_NAME);
const userModule = VuexModule(USERTYPES.MODULE_NAME);

import SearchInputComponent from '@/common/components/SearchInput';
import FilterInputComponent from '@/common/components/FilterInput';
import ModuleErrorComponent from '@/common/components/ModuleError';
import DataNotFoundComponent from '@/common/components/DataNotFound';
import TableSkeletonLoadingIndicatorComponent from '@/common/components/TableSkeletonLoadingIndicator';

import TableUserListComponent from './TableUserList';

import MixinOptionsGender from '@/mixins/mixin-options-gender';

export default {
  mixins: [MixinOptionsGender],

  components: {
    SearchInputComponent,
    FilterInputComponent,
    ModuleErrorComponent,
    DataNotFoundComponent,
    TableUserListComponent,
    TableSkeletonLoadingIndicatorComponent,
  },

  data() {
    return {
      page: 1,
      totalData: 5000,
      limit: 10,
      innerFilter: {
        search: '',
        gender: '',
      },
      sort: {
        sortBy: undefined,
        sortDesc: undefined,
      },
      sortBy: '',
      users: [],
      status: 'idle',
      pagination: null,
    };
  },

  computed: {
    isBreakpointXs() {
      return this.$vuetify.breakpoint.name === 'xs';
    },

    ...rootModule.mapState({
      errorMessage: (state) => state.errorMessage[USERTYPES.FETCH_USER_LIST],
    }),
  },

  watch: {
    'innerFilter.search': {
      handler: debounce(function () {
        this.fetchResource();
      }, 500),
    },
    'innerFilter.gender': {
      handler: 'fetchResource',
    },
    sort: {
      handler: 'fetchResource',
      deep: true,
    },
  },

  mounted() {
    this.init();
  },

  methods: {
    ...userModule.mapActions({
      fetchList: USERTYPES.FETCH_USER_LIST,
    }),

    init() {
      this.fetchResource();
    },

    async fetchResource() {
      this.status = 'pending';

      const filters = {
        page: this.page,
        pageSize: this.limit,
        results: this.limit,
        keyword: this.innerFilter.search || undefined,
        gender: this.innerFilter.gender || undefined,
      };

      if (this.sort.sortBy) {
        filters.sortBy = this.sort.sortBy;
        filters.sortOrder = this.sort.sortDesc ? 'desc' : 'ascend';
      }

      const payload = { filters };

      try {
        const { items } = await this.fetchList(payload);
        this.users = items;
        this.status = 'resolved';
      } catch (error) {
        this.users = [];
        this.status = 'rejected';
      }
    },

    changePageHandler(value) {
      this.page = value;
      this.fetchResource();
    },

    handleResetFilter() {
      this.innerFilter.search = '';
      this.innerFilter.gender = '';
      this.fetchResource();
    },

    handleSort(sort) {
      this.sort.sortBy = sort.sortBy;
      this.sort.sortDesc = sort.sortDesc;
      this.fetchResource();
    },
  },
};
</script>
