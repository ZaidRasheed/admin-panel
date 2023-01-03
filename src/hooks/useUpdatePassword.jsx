import { useRef, useState } from 'react'
import { UserAuth } from '../context/app context/AuthContext'
import { Alert } from 'react-bootstrap'

export default function useUpdatePassword() {
    const [show, setShow] = useState(false)
    const handleClose = () => {
        setError('')
        setSuccess('')
        setLoading(false)
        setShow(false)
    }
    const handleShow = () => setShow(true)

    const oldPassword = useRef()

    const passwordRef = useRef()
    const passwordConfirmRef = useRef()

    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const { resetPassword } = UserAuth()

    function handleSubmit(event) {
        event.preventDefault()
        setLoading(true)

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            setLoading(false)
            return setError('Passwords do not match.')
        }

        if (oldPassword.current.value === passwordRef.current.value) {
            setLoading(false)
            return setError("New password can't be the same as the old one.")
        }
        if (passwordRef.current.value.length < 6) {
            setLoading(false)
            return setError('Weak Password.')
        }
        resetPassword(oldPassword.current.value, passwordRef.current.value)
            .then((res) => {
                if (res.status === 'success') {
                    setSuccess(res.message)
                }
                else {
                    setLoading(false)
                    setError(res.message)
                }
            })
            .catch(error => {
                setLoading(false)
                setError("Error, Couldn't Update password ")
            })
    }
    const ErrorAlert = <>{error && <Alert variant='danger' onClose={() => setError('')} dismissible>{error}</Alert>}</>
    const SuccessAlert = <>{success && <Alert variant='success' onClose={() => setSuccess('')} dismissible>{success}</Alert>}</>

    return {
        show,
        handleShow,
        handleClose,
        oldPassword,
        passwordRef,
        passwordConfirmRef,
        loading,
        handleSubmit,
        ErrorAlert,
        SuccessAlert
    }
}
