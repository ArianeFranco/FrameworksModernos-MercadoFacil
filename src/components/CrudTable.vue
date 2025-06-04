<template>
  <v-card class="mt-4">
    <v-card-title>CRUD de Itens</v-card-title>
    <v-card-text>
      <v-text-field v-model="novoItem" label="Novo Item" />
      <v-btn @click="adicionar" color="green" class="mt-2">Adicionar</v-btn>

      <v-list>
        <v-list-item v-for="(item, index) in itens" :key="index">
          <v-list-item-title>{{ item }}</v-list-item-title>
          <v-btn icon @click="remover(index)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'

const novoItem = ref('')
const itens = ref([])

const adicionar = () => {
  if (novoItem.value) {
    itens.value.push(novoItem.value)
    novoItem.value = ''
  }
}

const remover = (index) => {
  itens.value.splice(index, 1)
}
</script>
