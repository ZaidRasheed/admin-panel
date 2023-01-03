import 'bootstrap/dist/css/bootstrap.min.css'
import { AuthContextProvider } from './context/app context/AuthContext.jsx'
import { Routes, Route } from 'react-router-dom'

import { lazy, Suspense } from 'react'
import LoadingSpinner from './components/UI/LoadingSpinner'

const Login = lazy(() => import('./pages/LogIn.jsx'))
const ResetPassword = lazy(() => import('./pages/ResetPassword.jsx'))
const Error = lazy(() => import('./pages/Error.jsx'))

const PrivateRoutes = lazy(() => import('./routes/PrivateRoutes.jsx'))
const PublicRoutes = lazy(() => import('./routes/PublicRoutes.jsx'))

const Admin = lazy(() => import('./components/Admin.jsx'))

function App() {

  return (
    <AuthContextProvider>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route element={<PublicRoutes />}>
            <Route element={<Login />} path="/" />
          </Route>
          <Route element={<PrivateRoutes />} >
            <Route path='/admin-panel/*' element={<Admin />} />
          </Route>
          <Route element={<ResetPassword />} path="/reset-password" />
          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>
    </AuthContextProvider>
  )
}

export default App
