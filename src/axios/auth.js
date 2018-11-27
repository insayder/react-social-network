import axios from 'axios'

export const axiosAuth = axios.create({
  baseURL: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/'
})

export const axiosRefreshToken = axios.create({
  baseURL: 'https://securetoken.googleapis.com/v1/'
})
