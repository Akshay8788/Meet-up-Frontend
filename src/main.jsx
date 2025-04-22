import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Details from './pages/Details.jsx'


const route = createBrowserRouter([
  {
  path:"/events/:id",
  element: <Details />
  },
  {
    path: "/",
    element: <App />
  }
]
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={route} />
  </StrictMode>,
)
