import useUpdatePassword from '../hooks/useUpdatePassword'
import { Form, Button, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function UpdatePassword() {
    const {
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
    } = useUpdatePassword()

    return (
        <div className="w-100 text-center mt-5">
            <Button
                variant="link"
                onClick={handleShow}>
                <h4 className='m-0'>Update Password?</h4>
            </Button>
            <Modal centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="w-100">
                        {ErrorAlert}
                        {SuccessAlert}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className='mb-3'>
                                <Form.Label>Old Password</Form.Label>
                                <Form.Control type='password' ref={oldPassword} autoComplete='current-password' required />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>New Password</Form.Label>
                                <Form.Control type='password' ref={passwordRef} autoComplete='current-password' required />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Confirm New Password</Form.Label>
                                <Form.Control type='password' ref={passwordConfirmRef} autoComplete='current-password' required />
                            </Form.Group>
                            <Button disabled={loading} className='w-100 mt-3 mb-3' type='submit'> Submit</Button>
                        </Form>
                    </div>
                    <div className="w-100 text-center mt-2">
                        Forgot password? <Link to='/reset-password'>Reset</Link>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}


