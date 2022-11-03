import { UserAuth } from "../context/AuthContext"
import { Button } from 'react-bootstrap'
import { useNavigate } from "react-router-dom"
import UpdatePassword from "../UpdatePassword"
export default function Profile(props) {
    const { logOut } = UserAuth()
    const navigate = useNavigate()
    return (
        <div style={{ margin: "20px 0 0 50px", position: 'relative', width: '90vw', maxWidth: '1300px' }}>
            <p className="display-1">Profile</p>
            <p className="display-5">Hello {props.admin.gender === 'male' ? 'Mr.' : 'Mrs.'} {props.admin.name}</p>
            <p className="display-6">Email: {props.admin.email}</p>
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
