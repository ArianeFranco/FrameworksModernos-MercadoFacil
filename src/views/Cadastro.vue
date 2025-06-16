<template>
  <v-app>
    <v-main class="d-flex align-center justify-center" style="background-color: #f5f7fa">
      <v-card class="pa-6" max-width="420" elevation="12">
        <v-card-title class="justify-center text-center">
          <div>
            <v-icon size="42" color="blue">mdi-storefront</v-icon>
            <h2 class="font-weight-bold mt-2">Mercado Fácil</h2>
            <p class="text-subtitle-2">Crie sua conta gratuitamente</p>
          </div>
        </v-card-title>

        <v-card-text>
          <v-form @submit.prevent="cadastrar">
            <v-text-field
              v-model="estabelecimento"
              label="Nome do Estabelecimento"
              required
              class="mb-4"
              density="comfortable"
            >
              <template #prepend-inner>
                <v-icon size="18">mdi-store</v-icon>
              </template>
            </v-text-field>

            <v-text-field
              v-model="email"
              label="E-mail"
              type="email"
              required
              class="mb-4"
              density="comfortable"
            >
              <template #prepend-inner>
                <v-icon size="18">mdi-email</v-icon>
              </template>
            </v-text-field>

            <v-text-field
              v-model="senha"
              label="Senha"
              type="password"
              required
              class="mb-4"
              density="comfortable"
            >
              <template #prepend-inner>
                <v-icon size="18">mdi-lock</v-icon>
              </template>
            </v-text-field>

            <v-text-field
              v-model="confirmarSenha"
              label="Confirmar Senha"
              type="password"
              required
              class="mb-4"
              density="comfortable"
            >
              <template #prepend-inner>
                <v-icon size="18">mdi-lock-check</v-icon>
              </template>
            </v-text-field>

            <v-btn color="blue-darken-3" block class="mb-3" type="submit">
              <v-icon start size="18">mdi-account-plus</v-icon>
              Cadastrar
            </v-btn>

            <v-btn
              class="mb-4"
              color="blue lighten-4"
              block
              @click="cadastrarComGoogle"
            >
              <v-icon start size="18">mdi-google</v-icon>
              Cadastrar com Google
            </v-btn>
          </v-form>
        </v-card-text>

        <v-card-actions class="justify-center">
          <router-link to="/" class="text-decoration-none text-blue text-body-2">
            Já tem uma conta? Entrar
          </router-link>
        </v-card-actions>
      </v-card>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useRouter } from 'vue-router'

const auth = getAuth()
const router = useRouter()

const estabelecimento = ref('')
const email = ref('')
const senha = ref('')
const confirmarSenha = ref('')

const cadastrar = async () => {
  if (!estabelecimento.value) {
    alert('Informe o nome do estabelecimento.')
    return
  }

  if (senha.value !== confirmarSenha.value) {
    alert('As senhas não coincidem.')
    return
  }

  try {
    await createUserWithEmailAndPassword(auth, email.value, senha.value)
    router.push('/dashboard')
  } catch (error) {
    alert('Erro ao cadastrar: ' + error.message)
  }
}

const cadastrarComGoogle = async () => {
  const provider = new GoogleAuthProvider()
  try {
    await signInWithPopup(auth, provider)
    router.push('/dashboard')
  } catch (error) {
    alert('Erro no cadastro com Google: ' + error.message)
  }
}
</script>
