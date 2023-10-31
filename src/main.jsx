import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Main from './Main/Main.jsx'
import { NextUIProvider } from '@nextui-org/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <NextUIProvider>
  <React.StrictMode>
    <Main></Main>
  </React.StrictMode>
  </NextUIProvider>
)
