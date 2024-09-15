import axios from 'axios'

export const ApiClient = axios.create({
  baseURL: 'https://music-api.zalimannard.ru'
})
