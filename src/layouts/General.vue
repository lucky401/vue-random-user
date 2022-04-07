<template>
  <fragment>
    <app-bar-component />
    <v-main>
      <router-view />
    </v-main>
  </fragment>
</template>

<script>
import { Fragment } from 'vue-frag';

import AppBarComponent from './components/AppBar';

export default {
  components: {
    Fragment,
    AppBarComponent,
  },
};
</script>
