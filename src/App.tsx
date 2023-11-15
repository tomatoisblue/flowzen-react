import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import DashboardPage from "./pages/Dashboard"
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import { useEffect } from 'react'
import verifyAuthentication from './components/verifyAuthentication'
import { login, logout } from './features/authSlice'
import NotFoundPage from './pages/NotFoundPage'
import { useAppDispatch, useAppSelector } from './hooks'

const App = () => {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkAuthentication = async () => {
      const result: boolean = await verifyAuthentication();
      if (result === true) {
        console.log("varification succeeded")
        dispatch(login());
      } else {
        console.log("varification failed")
        dispatch(logout());
      }
    }

    checkAuthentication();
  }, [dispatch])


  return (
    <div className='min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <BrowserRouter>
          <Routes>
            {auth.isLoggedIn ? (
              <>
                <Route path="/dashboard" element={<DashboardPage />} />
              </>
            ): (
              <>
                <Route path="/" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
              </>
            )}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App
