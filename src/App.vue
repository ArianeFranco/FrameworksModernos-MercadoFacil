<script setup>
import { useAuthStore } from './store/auth'
useAuthStore().init()
</script>

<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
}
</style>
