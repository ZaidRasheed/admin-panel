import { useState } from 'react'
import { UserAuth } from '../components/context/AuthContext.jsx'
import { Navigate } from 'react-router-dom'

export default function PrivateRoutes({ children }) {
    const { currentUser, getAdminData, logOut } = UserAuth()
    const [isAdmin, setIsAdmin] = useState(false)

    if (currentUser)
        getAdminData(currentUser?.uid)
            .then(res => {
                if (res.name) {
                    setIsAdmin(true)
                }
                else {
                    logOut()
                }
            })
            .catch(e => {
                logOut()
            })
    else
        return <Navigate to='/' />

    if (isAdmin)
        return children
}
