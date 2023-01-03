import { useState } from 'react'
import { Button, Alert, Modal } from 'react-bootstrap'
import { UserAuth } from '../../../context/app context/AuthContext.jsx'

export default function DeletedTeacherModal(props) {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)

    const { deleteTeacher } = UserAuth()

    const closeModal = () => {
        props.setDeleteModal(false)
    }

    const handleDeleteTeacher = () => {
        setError('')
        setSuccess('')
        setLoading(true)
        deleteTeacher(props.teacher.id)
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
        <Modal centered show={props.deleteModal} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Teacher</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant='danger' onClose={() => setError('')} dismissible>{error}</Alert>}
                {success && <Alert variant='success' onClose={() => setSuccess('')}>{success}</Alert>}
                <h3>Delete {props.teacher.gender === 'male' ? 'Mr.' : 'Mrs.'} <i>{props.teacher.firstName} {props.teacher.lastName}'s</i> account?</h3>
                <p>*Note: This action is not reversible.</p>
            </Modal.Body>
            <Modal.Footer>
                <Button disabled={loading} variant='danger' style={{ marginRight: '10px' }} onClick={handleDeleteTeacher}>Delete</Button>
                <Button disabled={loading} variant='secondary' className='w-25' onClick={closeModal}>Cancel</Button>
            </Modal.Footer>
        </Modal>
    )
}
