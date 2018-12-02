import axios from 'axios'

export const instanceAlbums = axios.create({
  baseURL: 'https://react-social-network-1f579.firebaseio.com/'
})

export const instanceLoadPhoto = axios.create({
  baseURL: 'gs://react-social-network-1f579.appspot.com/',
  contentType: 'image/jpeg'
})
