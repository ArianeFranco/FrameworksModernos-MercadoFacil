<template>
  <v-container>
    <v-row justify="space-between" align="center">
      <h1>Dashboard</h1>
      <v-btn color="error" @click="logout">Sair</v-btn>
    </v-row>
    <CrudTable />
  </v-container>
</template>

<script setup>
import CrudTable from '../components/CrudTable.vue'
import { signOut, auth } from '../firebase'
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = async () => {
  await signOut(auth)
  router.push('/')
}
</script>
