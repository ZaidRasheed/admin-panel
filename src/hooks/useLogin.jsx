import { useRef, useState } from 'react'
import { UserAuth } from '../context/app context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Alert } from 'react-bootstrap'
export default function useLogin() {

    const { logIn } = UserAuth()

    const navigate = useNavigate()

    const emailRef = useRef()
    const passwordRef = useRef()

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handLogin(event) {
        event.preventDefault()

        setError('')
        setLoading(true)

        if (passwordRef.current.value.length < 4) {
            setLoading(false)
            return setError('Invalid Password')
        }

        try {
            await logIn(emailRef.current.value.trim(), passwordRef.current.value.trim())
            navigate('/admin-panel')
        }
        catch (e) {
            switch (e.code) {
                case 'auth/user-not-found': {
                    setError("A username with this email doesn't exist,\n Sign up instead?")
                    break
                }
                case 'auth/wrong-password': {
                    setError('Wrong password please try again')
                    break
                }
                case 'auth/too-many-requests': {
                    setError('Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.')
                    break
                }
                default: {
                    setError('Failed to login')
                }
            }
            setLoading(false)
        }
    }
    const ErrorAlert = <>{error && <Alert variant='danger' onClose={() => setError('')} dismissible>{error}</Alert>}</>
    return {
        emailRef,
        passwordRef,
        loading,
        handLogin,
        ErrorAlert
    }
}
