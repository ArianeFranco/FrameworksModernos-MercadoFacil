import { defineStore } from 'pinia'
import api from '../axios'

export const useProdutosStore = defineStore('produtos', {
  state: () => ({
    lista: [],
    carregando: false,
    erro: null,
  }),

  actions: {
    async carregarProdutos() {
      this.carregando = true
      try {
        const response = await api.get('/produtos')
        this.lista = response.data
        this.erro = null
      } catch (err) {
        this.erro = 'Erro ao carregar produtos'
      } finally {
        this.carregando = false
      }
    },

    async adicionarProduto(produto) {
      try {
        await api.post('/produtos', produto)
        await this.carregarProdutos()
      } catch (err) {
        this.erro = 'Erro ao adicionar produto'
      }
    },

    async atualizarProduto(produto) {
      try {
        await api.put(`/produtos/${produto.id}`, produto)
        await this.carregarProdutos()
      } catch (err) {
        this.erro = 'Erro ao atualizar produto'
      }
    },

    async deletarProduto(id) {
      const confirmacao = confirm('Tem certeza que deseja excluir este produto?')
      if (!confirmacao) return

      try {
        await api.delete(`/produtos/${id}`)
        await this.carregarProdutos()
      } catch (error) {
        alert('Erro ao excluir produto')
      }
    }
  }
})
