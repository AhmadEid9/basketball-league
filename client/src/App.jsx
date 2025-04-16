import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import NotFound404 from './pages/NotFound404'
import Signup from './pages/Signup'
import { Login } from './pages/Login'
import Navbar from './components/Navbar'
import datkTheme from './themes/dark'

function App() {
  return (
    <div className={datkTheme.bg + datkTheme.text}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </div>
  )
}

export default App
