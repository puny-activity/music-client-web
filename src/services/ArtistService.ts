import axios from 'axios'
import type { CursorPair } from '@/services/Pagination'
import { ApiClient } from '@/services/ApiClient'

export interface GetArtistsResponse {
  artists: GetArtistsArtist[]
  pagination: CursorPair
}

export interface GetArtistsArtist {
  id: string
  title: string
  song_count: number
  covers: GetArtistsArtistCover[]
}

export interface GetArtistsArtistCover {
  id: string
}

export const ArtistService = {
  async getArtists(limit: number, sort: string | null): Promise<GetArtistsResponse> {
    try {
      const response = await ApiClient.get(
        '/artists?limit=' + limit + (sort ? '&sort=' + sort : ''),
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
