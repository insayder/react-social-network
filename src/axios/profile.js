import axios from 'axios'

export const axiosProfile = axios.create({
  baseURL: 'https://react-social-network-1f579.firebaseio.com/profiles/'
})
