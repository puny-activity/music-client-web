import axios from 'axios'
import { ApiClient } from '@/services/ApiClient'

export interface GetCoverUrlResponse {
  url: string
}

export const CoverService = {
  async getUrl(coverId: string): Promise<GetCoverUrlResponse> {
    try {
      const response = await ApiClient.get('/covers/' + coverId + '/url', {
        headers: {
          'X-API-Version': `1`,
          credentials: 'same-origin'
        }
      })
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('Ошибка при запросе адреса обложки')
      } else {
        console.error('Непредвиденная ошибка')
      }
      throw error
    }
  }
}
