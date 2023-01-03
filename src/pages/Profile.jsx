import { UserAuth } from "../context/app context/AuthContext"
import { Button } from 'react-bootstrap'
import { useNavigate } from "react-router-dom"
import UpdatePassword from "../components/UpdatePassword"

import { useAdmin } from "../context/admin context/AdminContext"

export default function Profile() {
    const { logOut } = UserAuth()
    const { admin } = useAdmin()

    const navigate = useNavigate()
    
    return (
        <div style={{ margin: "20px 0 0 50px", position: 'relative', width: '90vw', maxWidth: '1300px' }}>
            <p className="display-1">Profile</p>
            <p className="display-5">Hello {admin?.gender === 'male' ? 'Mr.' : 'Mrs.'} {admin?.name}</p>
            <p className="display-6">Email: {admin?.email}</p>
            <UpdatePassword />
            <Button
                style={{ position: 'absolute', top: "20px", right: "20px", borderWidth: '2px' }}
                variant='outline-dark'
                size="lg"
                onClick={() => {
                    logOut()
                    navigate('/')
                }}
            >Logout</Button>
        </div>
    )
}
