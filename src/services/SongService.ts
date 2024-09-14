import axios from 'axios'
import type { CursorPair } from '@/services/Pagination'
import { ApiClient } from '@/services/ApiClient'

export interface GetSongsResponse {
  songs: GetSongsSong[]
  pagination: CursorPair
}

export interface GetSongsSong {
  id: string
  title: string
  duration: number
  coverId: string | null
  genre: GetSongsSongGenre
  album: GetSongsSongAlbum
  artist: GetSongsSongArtist
  year: number | null
  number: number | null
  comment: string | null
  channels: number
  bitrateKbps: number
  sampleRaeHz: number
}

export interface GetSongsSongGenre {
  id: string
  name: string
}

export interface GetSongsSongAlbum {
  id: string
  title: string
}

export interface GetSongsSongArtist {
  id: string
  name: string
}

export const SongService = {
  async getSongs(
    limit: number,
    fltrGenreIds: string[] | null,
    fltrAlbumIds: string[] | null,
    fltrArtistIds: string[] | null,
    search: string | null,
    sort: string | null,
    nextCursor: string | null
  ): Promise<GetArtistsResponse> {
    let artistFilter = ''
    let albumFilter = ''
    let genreFilter = ''
    try {
      if (fltrGenreIds) {
        for (const fltrGenreId of fltrGenreIds) {
          genreFilter += '&genre_id=' + fltrGenreId
        }
      }
      if (fltrAlbumIds) {
        for (const fltrAlbumId of fltrAlbumIds) {
          albumFilter += '&album_id=' + fltrAlbumId
        }
      }
      if (fltrArtistIds) {
        for (const fltrArtistId of fltrArtistIds) {
          artistFilter += '&artist_id=' + fltrArtistId
        }
      }
      const response = await ApiClient.get(
        '/songs?limit=' +
          limit +
          (sort ? '&sort=' + sort : '') +
          (nextCursor ? '&cursor=' + nextCursor : '') +
          genreFilter +
          albumFilter +
          artistFilter +
          (search != null ? '&search=' + search : ''),
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
        console.log('Ошибка при запросе песен' + error)
      } else {
        console.error('Непредвиденная ошибка' + error)
      }
      throw error
    }
  }
}
