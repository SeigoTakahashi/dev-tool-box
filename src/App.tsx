import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { ALL_ROUTES } from './router/routes'
import { ThemeProvider } from './common/context/ThemeContext'

function App() {
  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            {ALL_ROUTES.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App
