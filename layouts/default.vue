<template>
  <v-app>
    <v-app-bar color="primary" density="compact">
      <v-toolbar-title
        >COVID-19 Cases Interactive Map Web Application</v-toolbar-title
      >
    </v-app-bar>
    <v-main>
      <slot />
      <Snackbar />
      <DigestFormDialog />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
// Components are auto-imported in Nuxt 3
</script>
