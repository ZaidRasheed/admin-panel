import { useEffect, useState } from 'react'
import { UserAuth } from './context/AuthContext'
import Sidebar from './side bar/Sidebar.jsx'
import Profile from './options/Profile.jsx'
import Teachers from './options/edit teachers/Teachers.jsx'
import AddTeacher from './options/create teachers/AddTeacher.jsx'

export default function Admin() {
    const [active, setActive] = useState('Teachers')
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

    return (
        <div style={{ display: "flex", maxHeight: '100vh' }}>
            <Sidebar
                active={active}
                setActive={setActive}
            />
            {active === 'Teachers' &&
                <Teachers
                    teachers={teachers}
                    refreshData={refreshData}
                />
            }
            {active === 'Add Teacher' &&
                <AddTeacher
                    refreshData={refreshData}
                />
            }
            {active === 'Profile' &&
                <Profile
                    admin={admin}
                />
            }
        </div>
    )
}
