import { useRef, useState } from 'react'
import { UserAuth } from '../context/app context/AuthContext'
import { Alert } from 'react-bootstrap'

export default function useAddTeacher(refreshData) {
    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const [gender, setGender] = useState('Choose')
    const [enabled, setEnabled] = useState('Choose')

    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const { createTeacher } = UserAuth()

    const enable = () => {
        setEnabled('Enabled')
    }

    const disable = () => {
        setEnabled('Disable')
    }

    const setMale = () => {
        setGender('Male')
    }

    const setFemale = () => {
        setGender('Female')
    }

    function handleAddTeacher(event) {
        event.preventDefault()
        setError('')
        setSuccess('')
        setLoading(true)

        const teacher = {
            firstName: firstNameRef?.current?.value,
            lastName: lastNameRef?.current?.value,
            email: emailRef?.current?.value,
            password: passwordRef?.current?.value,
            passwordConfirm: passwordConfirmRef?.current?.value,
            gender: gender.toLowerCase(),
            disabled: enabled.toLowerCase()
        }
        console.table(teacher)
        createTeacher(teacher)
            .then(response => {
                if (response.status === 'success') {
                    firstNameRef.current.value = ''
                    lastNameRef.current.value = ''
                    emailRef.current.value = ''
                    passwordRef.current.value = ''
                    passwordConfirmRef.current.value = ''
                    setGender('Choose')
                    setSuccess(response.message)
                    refreshData()
                }
                else
                    setError(response.message)
            })
            .catch(() => {
                setError("Couldn't process request due to unresolved issue")
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const ErrorAlert = <>
        {error && <Alert variant='danger' onClose={() => setError('')} dismissible>{error}</Alert>}
    </>

    const SuccessAlert = <>
        {success && <Alert variant='success' onClose={() => setSuccess('')} dismissible>{success}</Alert>}
    </>

    return {
        firstNameRef,
        lastNameRef,
        emailRef,
        passwordRef,
        passwordConfirmRef,
        gender,
        setMale,
        setFemale,
        enabled,
        enable,
        disable,
        loading,
        ErrorAlert,
        SuccessAlert,
        handleAddTeacher
    }
}
