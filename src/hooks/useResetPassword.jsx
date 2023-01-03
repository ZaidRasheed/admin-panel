import { useState, useRef } from 'react'
import { UserAuth } from '../context/app context/AuthContext'
import { Alert } from 'react-bootstrap'

export default function useResetPassword() {
    const emailRef = useRef()

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState('')

    const { sendResetPasswordLink } = UserAuth()

    async function handleSubmit(event) {

        event.preventDefault()
        setLoading(true)

        if (emailRef.current.value.length < 4) {
            setLoading(false)
            return setError('Invalid email')
        }

        try {
            setError('')
            await sendResetPasswordLink(emailRef.current.value)
            setSuccess("Email sent please check inbox")
        }
        catch (error) {
            switch (error.code) {
                case 'auth/user-not-found':
                    setError('No user found with this email')
                    break
                default:
                    setError('Failed to send link')
            }
            setLoading(false)
        }
    }
    const ErrorAlert = <>{error && <Alert variant='danger' onClose={() => setError('')} dismissible>{error}</Alert>}</>
    const SuccessAlert = <>{success && <Alert variant='success' onClose={() => setSuccess('')} dismissible>{success}</Alert>}</>

    return {
        emailRef,
        loading,
        ErrorAlert,
        SuccessAlert,
        handleSubmit
    }
}
