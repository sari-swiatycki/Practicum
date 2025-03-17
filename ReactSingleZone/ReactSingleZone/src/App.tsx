import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UploadSong from './components/UploadSong'
import { Provider } from 'react-redux'
import songStore from './Stores/songStore'
import CategoryList from './components/CategoryList'
import { BrowserRouter, RouterProvider } from 'react-router-dom'
import { Router } from './Router'
import Header from './components/Header'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Provider store={songStore}>

        
        <RouterProvider router={Router} />
    
    </Provider>

    </>
  )
}

export default App
