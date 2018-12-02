import { API_KEY } from './auth'
import firebase from 'firebase'

export const config = {
  apiKey: API_KEY,
  authDomain: 'react-social-network-1f579.firebaseapp.com',
  databaseURL: 'https://react-social-network-1f579.firebaseio.com',
  projectId: 'react-social-network-1f579',
  storageBucket: 'react-social-network-1f579.appspot.com',
  messagingSenderId: '262019521558'
}

firebase.initializeApp(config)
