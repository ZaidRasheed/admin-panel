import { Form, Button, Alert, Modal } from 'react-bootstrap'
import { useState } from 'react'
import { UserAuth } from '../../../context/app context/AuthContext.jsx'

export default function EditTeacherModal(props) {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)

    const [firstName, setFirstName] = useState(props.teacher.firstName)
    const [lastName, setLastName] = useState(props.teacher.lastName)
    const { editTeachersName } = UserAuth()

    const closeModal = () => {
        props.setEditModal(false)
    }

    const handleUpdateTeachersName = (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')
        setLoading(true)
        if (props.teacher.firstName.toLowerCase() === firstName.toLowerCase() && props.teacher.lastName.toLowerCase() === lastName.toLowerCase()) {
            setLoading(false)
            return setError('Please provide a new name.')
        }
        editTeachersName(props.teacher.id, firstName, lastName)
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
            .catch((error) => {
                setLoading(false)
                setError("Couldn't process request due to unresolved issue")
            })
    }

    return (
        <Modal centered show={props.editModal} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Teacher's Name</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant='danger' onClose={() => setError('')} dismissible>{error}</Alert>}
                {success && <Alert variant='success' onClose={() => setSuccess('')}>{success}</Alert>}
                <h4>Edit {props.teacher.gender === 'male' ? 'Mr.' : 'Mrs.'} <i>{props.teacher.firstName} {props.teacher.lastName}'s</i> name?</h4>
                <Form onSubmit={handleUpdateTeachersName}>
                    <Form.Group className='mb-3'>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type='string'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder='First Name'
                            required />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type='string'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder='Last Name'
                            required />
                    </Form.Group>
                    <Button disabled={loading} className='text-center w-100' variant='success' type='submit'>Update</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>

            </Modal.Footer>
        </Modal>
    )
}
