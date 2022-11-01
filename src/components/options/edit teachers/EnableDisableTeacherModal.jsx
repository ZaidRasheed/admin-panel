import { useState } from 'react'
import { Button, Alert, Modal } from 'react-bootstrap'
import { UserAuth } from '../../context/AuthContext.jsx'
export default function EnableDisableTeacherModal(props) {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false);

    const { enabledDisableTeacher } = UserAuth()

    const closeModal = () => {
        props.setEnableDisableModal(false)
    }

    const handleDeleteTeacher = () => {
        setError('')
        setSuccess('')
        setLoading(true)
        const status = props.teacher.disabled === false ? 'disable' : 'enable'
        enabledDisableTeacher(status, props.teacher.id)
            .then(response => {
                if (response.status === 'success') {
                    setSuccess(response.message)
                    props.refreshData()
                }
                else {
                    setLoading(false)
                    setError(response.message)
                }
            })
            .catch(() => {
                setError("Couldn't process request due to unresolved issue")
            })
    }

    return (
        <Modal centered show={props.enableDisableModal} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>{props.teacher.disabled === false ? 'Disable' : 'Enable'} Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant='danger' onClose={() => setError('')} dismissible>{error}</Alert>}
                {success && <Alert variant='success' onClose={() => setSuccess('')}>{success}</Alert>}
                <h3>{props.teacher.disabled === false ? 'Disable' : 'Enable'} {props.teacher.gender === 'male' ? 'Mr.' : 'Mrs.'} <i>{props.teacher.firstName} {props.teacher.lastName}'s</i> account?</h3>
            </Modal.Body>
            <Modal.Footer>
                <Button disabled={loading} variant='warning' style={{ marginRight: '10px' }} onClick={handleDeleteTeacher}>{props.teacher.disabled === false ? 'Disable' : 'Enable'}</Button>
                <Button disabled={loading} variant='secondary' className='w-25' onClick={closeModal}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}
