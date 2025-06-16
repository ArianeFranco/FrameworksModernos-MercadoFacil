<template>
  <v-app>
    <v-app-bar app color="blue-darken-3" dark>
      <v-app-bar-nav-icon @click="menu = !menu" />
      <v-icon class="me-2">mdi-store</v-icon>
      <v-toolbar-title class="font-weight-bold">Mercado Fácil</v-toolbar-title>
      <v-spacer />
      <span v-if="nomeUsuario" class="me-4">Bem-vindo, {{ nomeUsuario }}</span>
    </v-app-bar>

    <v-navigation-drawer v-model="menu" app>
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

    <v-main class="px-6">
      <v-container fluid class="mt-10">
        <v-row>
          <v-col cols="12" md="4">
            <v-card>
              <v-card-title class="text-h6 font-weight-bold">
                {{ editando ? 'Editar Produto' : 'Novo Produto' }}
              </v-card-title>
              <v-card-text>
                <v-text-field v-model="novo.nome" label="Nome" />
                <v-text-field v-model="novo.preco" label="Preço" type="number" />
                <v-text-field v-model="novo.quantidade" label="Quantidade" type="number" />
                <v-text-field v-model="novo.descricao" label="Descrição" />

                <v-btn color="green" block @click="editando ? salvarProduto() : adicionarProduto()">
                  <v-icon start>{{ editando ? 'mdi-content-save' : 'mdi-plus' }}</v-icon>
                  {{ editando ? 'Salvar Alterações' : 'Adicionar Produto' }}
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="8">
            <v-card>
              <v-card-title class="text-h6 font-weight-bold">Lista de Produtos</v-card-title>
              <v-card-text>
                <v-alert v-if="produtosStore.erro" type="error">{{ produtosStore.erro }}</v-alert>
                <v-progress-circular v-if="produtosStore.carregando" indeterminate color="primary" />
                <v-table v-if="produtosStore.lista.length">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Nome</th>
                      <th>Preço</th>
                      <th>Estoque</th>
                      <th>Descrição</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="produto in produtosStore.lista" :key="produto.id">
                      <td>{{ produto.id }}</td>
                      <td>{{ produto.nome }}</td>
                      <td>R$ {{ produto.preco }}</td>
                      <td>{{ produto.quantidade }}</td>
                      <td>{{ produto.descricao }}</td>
                      <td>
                        <v-icon small color="blue" @click="editarProduto(produto)">mdi-pencil</v-icon>
                        <v-icon small color="red" @click="produtosStore.deletarProduto(produto.id)">mdi-delete</v-icon>
                      </td>
                    </tr>
                  </tbody>
                </v-table>
                <p v-if="!produtosStore.lista.length && !produtosStore.carregando">
                  Nenhum produto cadastrado ainda.
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
import { useProdutosStore } from '../store/produtos'

const router = useRouter()
const auth = getAuth()
const display = useDisplay()
const menu = ref(true)
const nomeUsuario = ref('')
const editando = ref(false)
const novo = ref({ id: null, nome: '', preco: '', quantidade: '', descricao: '' })

const produtosStore = useProdutosStore()

onMounted(() => {
  const user = auth.currentUser
  if (user) {
    nomeUsuario.value = user.displayName || user.email
  }

  produtosStore.carregarProdutos()
})

const adicionarProduto = () => {
  if (!novo.value.nome || !novo.value.preco || !novo.value.quantidade) {
    alert('Preencha todos os campos.')
    return
  }

  produtosStore.adicionarProduto({ ...novo.value })
  novo.value = { nome: '', preco: '', quantidade: '', descricao: '' }
}

const editarProduto = (produto) => {
  editando.value = true
  novo.value = { ...produto }
}

const salvarProduto = () => {
  produtosStore.atualizarProduto({ ...novo.value })
  novo.value = { nome: '', preco: '', quantidade: '', descricao: '' }
  editando.value = false
}

const logout = async () => {
  await signOut(auth)
  router.push('/')
}
</script>
