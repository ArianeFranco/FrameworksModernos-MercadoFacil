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
        <v-row>
          <v-col cols="12" md="4">
            <v-card>
              <v-card-title class="text-h6 font-weight-bold">Registrar Nova Venda</v-card-title>
              <v-card-text>
                <v-text-field
                  v-model="novaVenda.produto_id"
                  label="ID do Produto"
                  type="number"
                  prepend-inner-icon="mdi-numeric"
                  class="mb-2"
                />
                <v-text-field
                  v-model="novaVenda.quantidade"
                  label="Quantidade"
                  type="number"
                  prepend-inner-icon="mdi-counter"
                  class="mb-4"
                />
                <v-btn color="blue" block @click="registrar">
                  <v-icon start>mdi-cart-arrow-down</v-icon>
                  Registrar Venda
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="8">
            <v-card>
              <v-card-title class="text-h6 font-weight-bold">Histórico de Vendas</v-card-title>
              <v-card-text>
                <v-progress-circular indeterminate v-if="vendasStore.carregando" color="primary" />
                <v-alert v-if="vendasStore.erro" type="error" class="mb-4">
                  {{ vendasStore.erro }}
                </v-alert>

                <v-table v-if="!vendasStore.carregando && vendasStore.lista.length">
                  <thead>
                    <tr>
                      <th>Produto</th>
                      <th>Quantidade</th>
                      <th>Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="venda in vendasStore.lista" :key="venda.id">
                      <td>{{ venda.produto_nome }}</td>
                      <td>{{ venda.quantidade }}</td>
                      <td>{{ formatarData(venda.data) }}</td>
                    </tr>
                  </tbody>
                </v-table>

                <p v-if="!vendasStore.lista.length && !vendasStore.carregando">
                  Nenhuma venda registrada ainda.
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAuth, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'
import { useVendasStore } from '../store/vendas'

const router = useRouter()
const auth = getAuth()
const user = auth.currentUser
const display = useDisplay()

const menu = ref(true)
const nomeUsuario = ref('')
const novaVenda = ref({ produto_id: '', quantidade: '' })

const vendasStore = useVendasStore()

onMounted(() => {
  if (user) {
    nomeUsuario.value = user.displayName || user.email
  }

  vendasStore.carregarVendas()
})

const registrar = () => {
  if (!novaVenda.value.produto_id || !novaVenda.value.quantidade) {
    alert('Preencha todos os campos.')
    return
  }

  vendasStore.registrarVenda({ ...novaVenda.value })
  novaVenda.value = { produto_id: '', quantidade: '' }
}

const formatarData = (data) => {
  return new Date(data).toLocaleString('pt-BR')
}

const logout = async () => {
  await signOut(auth)
  router.push('/')
}
</script>
