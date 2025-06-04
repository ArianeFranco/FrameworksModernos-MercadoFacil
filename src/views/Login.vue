<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="pa-6" elevation="8" rounded="xl">
          <v-card-title class="text-h5 text-center">Bem-vindo!</v-card-title>
          <v-card-text class="text-center text-subtitle-1">
            Acesse com sua conta Google para continuar
          </v-card-text>

          <v-divider class="my-4" />

          <v-btn @click="loginGoogle" color="blue-darken-1" variant="flat" block>
            <v-icon start>mdi-google</v-icon>
            Entrar com Google
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { signInWithPopup, provider, auth } from '../firebase'
import { useRouter } from 'vue-router'
import { VIcon } from 'vuetify/components'

const router = useRouter()

const loginGoogle = async () => {
  await signInWithPopup(auth, provider)
  router.push('/dashboard')
}
</script>
