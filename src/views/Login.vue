<template>
  <v-app>
    <v-main class="d-flex align-center justify-center" style="background-color: #f5f7fa">
      <v-card class="pa-6" max-width="420" elevation="12">
        <v-card-title class="justify-center text-center">
          <div>
            <v-icon size="42" color="blue">mdi-storefront</v-icon>
            <h2 class="font-weight-bold mt-2">Mercado Fácil</h2>
            <p class="text-subtitle-2">Controle de Estoque e Vendas</p>
          </div>
        </v-card-title>

        <v-card-text>
          <v-form @submit.prevent="entrar">
            <v-text-field
              v-model="email"
              label="E-mail"
              type="email"
              class="mb-4"
              density="comfortable"
              required
            >
              <template #prepend-inner>
                <v-icon size="18" class="me-2">mdi-email</v-icon>
              </template>
            </v-text-field>

            <v-text-field
              v-model="senha"
              label="Senha"
              type="password"
              class="mb-4"
              density="comfortable"
              required
            >
              <template #prepend-inner>
                <v-icon size="18" class="me-2">mdi-lock</v-icon>
              </template>
            </v-text-field>

            <v-btn color="blue-darken-3" block class="mb-3" type="submit">
              <v-icon start size="18">mdi-login</v-icon>
              Entrar
            </v-btn>

            <v-btn
              class="mb-4"
              color="blue lighten-4"
              block
              @click="loginComGoogle"
            >
              <v-icon start size="18">mdi-google</v-icon>
              Entrar com Google
            </v-btn>
          </v-form>
        </v-card-text>

        <v-card-actions class="justify-center">
          <router-link to="/cadastro" class="text-decoration-none text-blue text-body-2">
            Não tem conta? Cadastre-se
          </router-link>
        </v-card-actions>
      </v-card>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useRouter } from 'vue-router'

const auth = getAuth()
const router = useRouter()

const email = ref('')
const senha = ref('')

const entrar = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, senha.value)
    router.push('/dashboard')
  } catch (error) {
    alert('Erro ao entrar: ' + error.message)
  }
}

const loginComGoogle = async () => {
  const provider = new GoogleAuthProvider()
  try {
    await signInWithPopup(auth, provider)
    router.push('/dashboard')
  } catch (error) {
    alert('Erro no login com Google: ' + error.message)
  }
}
</script>
