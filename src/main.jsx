import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    {/* make the redux store available for all the components */}
    <Provider store ={store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </Provider>
  </StrictMode>
)

