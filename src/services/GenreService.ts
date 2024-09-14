import axios from 'axios'
import type { CursorPair } from '@/services/Pagination'
import { ApiClient } from '@/services/ApiClient'

export interface GetGenresResponse {
  genres: GetGenresGenre[]
  pagination: CursorPair
}

export interface GetGenresGenre {
  id: string
  name: string
  song_count: number
  covers: GetGenresGenreCover[]
}

export interface GetGenresGenreCover {
  id: string
}

export const GenreService = {
  async getGenres(limit: number, sort: string | null): Promise<GetGenresResponse> {
    try {
      const response = await ApiClient.get(
        '/genres?limit=' + limit + (sort ? '&sort=' + sort : ''),
        {
          headers: {
            'X-API-Version': `1`,
            credentials: 'same-origin'
          }
        }
      )
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('Ошибка при запросе исполнителей')
      } else {
        console.error('Непредвиденная ошибка')
      }
      throw error
    }
  }
}
