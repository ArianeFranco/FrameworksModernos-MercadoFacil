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


    <!-- MENU LATERAL RESPONSIVO -->
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

    <!-- CONTEÚDO PRINCIPAL -->
    <v-main class="px-6">
      <v-container fluid class="mt-10">
        <v-row dense>
          <v-col cols="12" md="4">
            <v-card>
              <v-card-title>
                <v-icon start color="green">mdi-cart</v-icon>
                Total de Vendas
              </v-card-title>
              <v-card-text class="text-h6 font-weight-bold">{{ totalVendas }}</v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card>
              <v-card-title>
                <v-icon start color="red">mdi-currency-brl</v-icon>
                Faturamento Total
              </v-card-title>
              <v-card-text class="text-h6 font-weight-bold">R$ {{ faturamento.toFixed(2) }}</v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card>
              <v-card-title>
                <v-icon start color="blue">mdi-cube</v-icon>
                Produtos Cadastrados
              </v-card-title>
              <v-card-text class="text-h6 font-weight-bold">{{ totalProdutos }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- GRÁFICOS -->
        <v-row dense class="mt-4">
          <v-col cols="12" md="6">
            <v-card>
              <v-card-title>Produtos Mais Vendidos</v-card-title>
              <v-card-text>
                <canvas ref="barChart"></canvas>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="6">
            <v-card>
              <v-card-title>Distribuição de Estoque</v-card-title>
              <v-card-text>
                <canvas ref="pieChart"></canvas>
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
import { useRouter } from 'vue-router'
import { getAuth, signOut } from 'firebase/auth'
import { Chart, registerables } from 'chart.js'
import { useDisplay } from 'vuetify'
import axios from 'axios'

Chart.register(...registerables)

const router = useRouter()
const auth = getAuth()
const user = auth.currentUser
const menu = ref(true)
const display = useDisplay()
const nomeUsuario = ref('')

// Cards
const totalVendas = ref(0)
const faturamento = ref(0)
const totalProdutos = ref(0)

// Gráficos
const barChart = ref(null)
const pieChart = ref(null)
let barChartInstance = null
let pieChartInstance = null

onMounted(async () => {
  if (user) {
    nomeUsuario.value = user.displayName || user.email
  }

  await carregarDashboard()
})

const logout = async () => {
  await signOut(auth)
  router.push('/')
}

const carregarDashboard = async () => {
  try {
    const res = await axios.get('http://localhost:3000/dashboard/resumo')
    console.log('Dashboard API data: ', res.data)
    totalVendas.value = res.data.totalVendas
    faturamento.value = Number(res.data.faturamento || 0)
    totalProdutos.value = res.data.totalProdutos || res.data.produtos || 0

    renderCharts(res.data.maisVendidos, res.data.estoqueDistribuido)
  } catch (error) {
    console.error('Erro ao carregar dashboard:', error)
  }
}

const renderCharts = (maisVendidos, estoqueDistribuido) => {
  if (barChartInstance) barChartInstance.destroy()
  if (pieChartInstance) pieChartInstance.destroy()

  if (barChart.value) {
    barChartInstance = new Chart(barChart.value, {
      type: 'bar',
      data: {
        labels: maisVendidos.map(p => p.nome),
        datasets: [{
          label: 'Unidades Vendidas',
          data: maisVendidos.map(p => p.quantidade),
          backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#FF6384', '#9CCC65']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    })
  }

  if (pieChart.value) {
    pieChartInstance = new Chart(pieChart.value, {
      type: 'pie',
      data: {
        labels: estoqueDistribuido.map(p => p.nome),
        datasets: [{
          data: estoqueDistribuido.map(p => p.quantidade),
          backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#FF6384', '#9CCC65']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    })
  }
}
</script>
