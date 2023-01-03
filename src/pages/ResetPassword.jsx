import useResetPassword from '../hooks/useResetPassword'
import { Container, Form, Button, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function ResetPassword() {

    const { emailRef,
        loading,
        ErrorAlert,
        SuccessAlert,
        handleSubmit } = useResetPassword()

    const navigate = useNavigate()
    return (
        <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
        >
            <div className="w-100" style={{ maxWidth: "450px" }}>
                <Card className='p-2'>
                    <Card.Body>
                        <h2 className='text-center mb-4'>Reset Password</h2>
                        {ErrorAlert}
                        {SuccessAlert}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className='mb-3'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type='email' ref={emailRef} autoComplete="email" required />
                                <p style={{ fontSize: "12px", marginTop: "5px" }}>Email might be in the spam folder</p>
                            </Form.Group>
                            <Button disabled={loading} className='w-100 mt-3 mb-3' type='submit'>Send Reset Link</Button>
                        </Form>
                    </Card.Body>
                </Card>
                <p role="button" className="w-100 text-center mt-2 link-primary " onClick={() => navigate(-1)}><u>Go back?</u></p>
            </div>
        </Container>
    )
}
