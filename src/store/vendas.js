import { defineStore } from 'pinia'
import api from '../axios'

export const useVendasStore = defineStore('vendas', {
  state: () => ({
    lista: [],
    carregando: false,
    erro: null,
  }),

  actions: {
    async carregarVendas() {
      this.carregando = true
      try {
        const response = await api.get('/vendas')
        this.lista = response.data
        this.erro = null
      } catch (err) {
        this.erro = 'Erro ao carregar vendas'
      } finally {
        this.carregando = false
      }
    },

    async registrarVenda(venda) {
      try {
        await api.post('/vendas', venda)
        await this.carregarVendas()
      } catch (err) {
        this.erro = 'Erro ao registrar venda'
      }
    }
  }
})
