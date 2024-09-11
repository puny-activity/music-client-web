import { defineStore } from 'pinia'

export const useCoversStore = defineStore('covers', {
  state: () => ({
    _coverUrlById: new Map<string, string>(),
  }),
  actions: {

  }
})