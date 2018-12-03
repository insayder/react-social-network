import axios from 'axios'

export const axiosPosts = axios.create({
  baseURL: 'https://react-social-network-1f579.firebaseio.com/posts.json'
})
