import { defineStore } from 'pinia'
import { CoverService } from '@/services/CoverService'

export const useCoversStore = defineStore('covers', {
  state: () => ({
    _coverUrlById: new Map<string, string>()
  }),
  actions: {
    async fetchCoverUrlById(coverId: string) {
      try {
        if (!this._coverUrlById.has(coverId)) {
          const coverUrl = await CoverService.getUrl(coverId)
          this._coverUrlById.set(coverId, coverUrl.url)
        }
      } catch (error) {
        console.error('Ошибка при загрузке обложки', error)
      }
    }
  },
  getters: {
    getCoverUrlById(state) {
      return (coverId: string) => {
        return state._coverUrlById.get(coverId) || undefined
      }
    }
  }
})
