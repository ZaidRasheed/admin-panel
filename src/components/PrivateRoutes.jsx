import { useState, useEffect } from 'react'
import { UserAuth } from '../components/context/AuthContext.jsx'
import { Navigate } from 'react-router-dom'

export default function PrivateRoutes({ children }) {
    const { currentUser, getAdminData, logOut } = UserAuth()
    const [loading, setLoading] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false)
    useEffect(() => {
        if (currentUser?.uid)
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
                .finally(() => {
                    setLoading(true);
                })
        else {
            setLoading(true);
        }
    }, [currentUser?.uid]);

    if (loading) {
        if (isAdmin)
            return children
        return <Navigate to='/' />
    }
}
