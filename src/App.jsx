import { AuthContextProvider } from './components/context/AuthContext.jsx'
import { Routes, Route } from 'react-router-dom'

import Login from './components/LogIn.jsx'
import Admin from './components/Admin.jsx'
import ResetPassword from './components/ResetPassword.jsx'
import Error from './components/Error.jsx'

import PrivateRoutes from './components/PrivateRoutes.jsx'
import PublicRoutes from './components/PublicRoutes.jsx'

function App() {

  return (
    <AuthContextProvider>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route element={<Login />} path="/" exact />
        </Route>
        <Route
          path='/panel'
          element={
            <PrivateRoutes>
              <Admin />
            </PrivateRoutes>
          }
        />
        <Route element={<ResetPassword />} path="/reset_password" exact />
        <Route path="*" element={<Error />} />
      </Routes>
    </AuthContextProvider>
  )
}

export default App
