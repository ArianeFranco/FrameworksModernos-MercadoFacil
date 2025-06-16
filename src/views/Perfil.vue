<template>
  <v-app>
    <!-- BARRA SUPERIOR -->
    <v-app-bar app color="blue-darken-3" dark>
      <v-app-bar-nav-icon @click="menu = !menu" />
        <v-icon class="me-2">mdi-store</v-icon>
        <v-toolbar-title class="font-weight-bold">Mercado Fácil</v-toolbar-title>
      <v-spacer />
      <span v-if="nomeUsuario" class="me-4">Bem-vindo, {{ nomeUsuario }}</span>
    </v-app-bar>

    <!-- Menu Lateral -->
    <v-navigation-drawer
      v-model="menu"
      app
      :permanent="!display.smAndDown"
      :temporary="display.smAndDown"
    >
      <v-list>
        <v-list-item title="Mercado Fácil" subtitle="Controle de Estoque" />
        <v-divider class="my-2" />
        <v-list-item link to="/dashboard" prepend-icon="mdi-view-dashboard" title="Dashboard" />
        <v-list-item link to="/produtos" prepend-icon="mdi-package-variant" title="Produtos" />
        <v-list-item link to="/vendas" prepend-icon="mdi-cart" title="Vendas" />
        <v-list-item link to="/perfil" prepend-icon="mdi-account" title="Meu Perfil" />
        <v-list-item @click="logout" prepend-icon="mdi-logout" title="Sair" />
      </v-list>
    </v-navigation-drawer>

    <!-- Conteúdo Principal -->
    <v-main class="px-6">
      <v-container fluid class="mt-10">
        <v-card max-width="800" class="mx-auto pa-6">
          <v-card-title class="text-h6 font-weight-bold mb-4">
            <v-icon class="me-2">mdi-account</v-icon>
            Meu Perfil
          </v-card-title>

          <v-card-text>
            <v-row dense>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="email"
                  label="E-mail"
                  readonly
                  prepend-inner-icon="mdi-email"
                />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="nomeEstabelecimento"
                  label="Nome do Estabelecimento *"
                  prepend-inner-icon="mdi-store"
                />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="telefone"
                  label="Telefone de Contato (opcional)"
                  prepend-inner-icon="mdi-phone"
                />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="endereco"
                  label="Endereço Comercial (opcional)"
                  prepend-inner-icon="mdi-map-marker"
                />
              </v-col>

              <v-col cols="12">
                <v-textarea
                  v-model="descricao"
                  label="Descrição do Negócio (opcional)"
                  prepend-inner-icon="mdi-text"
                  auto-grow
                />
              </v-col>

              <v-col cols="12">
                <v-btn color="blue-darken-3" block class="mb-2" @click="salvarPerfil">
                  <v-icon start size="20">mdi-content-save</v-icon>
                  Salvar Alterações
                </v-btn>

                <v-btn block variant="outlined" color="grey-darken-1" @click="router.push('/dashboard')">
                  <v-icon start size="20">mdi-arrow-left</v-icon>
                  Voltar
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAuth, updateProfile, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'

const router = useRouter()
const display = useDisplay()
const auth = getAuth()
const user = auth.currentUser

const menu = ref(true)
const nomeUsuario = ref('')
const email = ref('')
const nomeEstabelecimento = ref('')
const telefone = ref('')
const endereco = ref('')
const descricao = ref('')

onMounted(() => {
  if (user) {
    email.value = user.email
    nomeUsuario.value = user.displayName || user.email
    nomeEstabelecimento.value = user.displayName || ''
    // Os demais campos serão integrados com Firestore futuramente
  }
})

const salvarPerfil = async () => {
  if (!nomeEstabelecimento.value) {
    alert('Por favor, preencha o nome do estabelecimento.')
    return
  }

  try {
    await updateProfile(user, {
      displayName: nomeEstabelecimento.value
    })
    alert('Perfil atualizado com sucesso!')
    router.push('/dashboard')
  } catch (error) {
    alert('Erro ao atualizar o perfil: ' + error.message)
  }
}

const logout = async () => {
  await signOut(auth)
  router.push('/')
}
</script>
