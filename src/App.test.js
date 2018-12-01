import React from 'react'
import ReactDOM from 'react-dom'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import App from './App'
import store from './store'

it('renders without crashing', () => {
  const div = document.createElement('div')
  const app = (
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  )
  ReactDOM.render(app, div)
  ReactDOM.unmountComponentAtNode(div)
})
