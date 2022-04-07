<template>
  <v-data-table
    v-show="items.length > 0"
    mobile-breakpoint="1"
    :items-per-page="-1"
    class="custom-table"
    hide-default-footer
    min-height="550px"
    :headers="headers"
    :height="height"
    :items="items"
    fixed-header
    item-key="email"
    :sort-desc="sortDesc"
    :sort-by="sortBy"
    @update:sort-by="handleSortBy"
    @update:sort-desc="handleSortDesc"
  >
    <template v-slot:[`item.name`]="{ item }">
      <span class="text-capitalize">
        {{ getName(item.name) }}
      </span>
    </template>
    <template v-slot:[`item.registered.date`]="{ item }">
      <span class="text-capitalize">
        {{ item.registered.date | datetime }}
      </span>
    </template>
  </v-data-table>
</template>

<script>
export default {
  props: {
    items: { type: Array, default: () => [] },
    sortBy: { type: String, default: '' },
    sortDesc: { type: Boolean, default: false },
  },

  data() {
    return {
      innerSortDesc: undefined,
      innerSortBy: undefined,
      headers: [
        {
          text: 'Username',
          class: 'font-weight-semibold',
          width: 150,
          value: 'login.username',
        },
        {
          text: 'Name',
          class: 'font-weight-semibold',
          width: 150,
          value: 'name',
        },
        {
          text: 'Email',
          class: 'font-weight-semibold',
          width: 150,
          value: 'email',
        },
        {
          text: 'Gender',
          class: 'font-weight-semibold',
          width: 150,
          value: 'gender',
        },
        {
          text: 'Registered Date',
          class: 'font-weight-semibold',
          width: 150,
          value: 'registered.date',
        },
      ],
    };
  },

  computed: {
    height() {
      return this.$vuetify.breakpoint.name !== 'xs'
        ? 'calc(100vh - 350px)'
        : '';
    },
  },

  methods: {
    getName(name) {
      const { title, first, last } = name;
      return `${title} ${first} ${last}`;
    },

    handleSortBy(sortBy) {
      this.$emit('update:sort-by', sortBy);
    },

    handleSortDesc(sortDesc) {
      this.$emit('update:sort-desc', sortDesc);
    },
  },
};
</script>
