<template>
  <v-app-bar app outlined flat>
      <v-toolbar-title>Random User Table</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn @click="toggleTheme" icon v-on="on" v-bind="attrs">
            <v-icon v-if="$vuetify.theme.dark"> mdi-weather-night </v-icon>
            <v-icon v-else>mdi-weather-sunny</v-icon>
          </v-btn>
        </template>
        <span>Toggle Theme</span>
      </v-tooltip>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
};
</script>
