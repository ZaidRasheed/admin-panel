import { Navigate, Outlet } from "react-router-dom"
import { UserAuth } from "../context/app context/AuthContext.jsx"

export default function PublicRoutes() {

    const { currentUser } = UserAuth()
    return (
        !currentUser ? <Outlet /> : <Navigate to='/admin-panel' />
    )
}

