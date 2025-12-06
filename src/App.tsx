import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { ALL_ROUTES } from './router/routes'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {ALL_ROUTES.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
