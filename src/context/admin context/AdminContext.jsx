import { createContext, useContext, useEffect, useState } from 'react'
import { UserAuth } from '../app context/AuthContext'

const AdminContext = createContext()

export const useAdmin = () => {
    return useContext(AdminContext)
}

export default function AdminContextProvider(props) {
    const [admin, setAdmin] = useState()
    const [teachers, setTeachers] = useState()
    const { currentUser, getAdminData, getAllTeachers } = UserAuth()
    const [refresh, setRefresh] = useState(false)

    const refreshData = () => {
        setRefresh((prev) => {
            return !prev
        })
    }

    useEffect(() => {
        if (currentUser?.uid) {
            getAdminData(currentUser.uid)
                .then(user => {
                    setAdmin(user)
                })
                .catch(() => {
                    console.log('Error in fetching admin data.')
                })
            getAllTeachers()
                .then(data => {
                    setTeachers(data)
                })
                .catch(() => {
                    console.log('Error in fetching teachers data.')
                })
        }
    }, [currentUser?.uid, refresh])


    const values = {
        admin,
        teachers,
        refreshData
    }
    return (
        <AdminContext.Provider value={values}>
            {props.children}
        </AdminContext.Provider>
    )
}
