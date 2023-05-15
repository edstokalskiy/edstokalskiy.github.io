<template>
  <v-app-bar
    app
    color="purple"
    dark
  >
    <div class="d-flex align-center">
      <router-link :to="{ name: 'Home' }">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
      </router-link>
      <v-toolbar-title>Пошуковик</v-toolbar-title>
    </div>
  </v-app-bar>
</template>
<script>
export default {
  name: 'Header',
}
</script>