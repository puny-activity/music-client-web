import axios from 'axios'
import type { CursorPair } from '@/services/Pagination'
import { ApiClient } from '@/services/ApiClient'

export interface GetAlbumsResponse {
  albums: GetAlbumsAlbum[]
  pagination: CursorPair
}

export interface GetAlbumsAlbum {
  id: string
  title: string
  song_count: number
  covers: GetAlbumsAlbumCover[]
}

export interface GetAlbumsAlbumCover {
  id: string
}

export const AlbumService = {
  async getAlbums(limit: number, sort: string | null): Promise<GetAlbumsResponse> {
    try {
      const response = await ApiClient.get(
        '/albums?limit=' + limit + (sort ? '&sort=' + sort : ''),
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
        console.log('Ошибка при запросе альбомов')
      } else {
        console.error('Непредвиденная ошибка')
      }
      throw error
    }
  }
}
