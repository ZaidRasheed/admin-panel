import { useRef, useState } from 'react'
import { Col, Row, Container, Form, Button, Card, Alert, Dropdown, DropdownButton } from 'react-bootstrap'
import { UserAuth } from '../../context/AuthContext.jsx'

export default function AddTeacher(props) {
    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const [gender, setGender] = useState('Choose')
    const [enabled, setEnabled] = useState('Choose')

    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false);

    const { createTeacher } = UserAuth();

    async function handleSubmit(event) {
        event.preventDefault();
        setError('')
        setSuccess('')
        setLoading(true);

        const teacher = {
            firstName: firstNameRef?.current?.value,
            lastName: lastNameRef?.current?.value,
            email: emailRef?.current?.value,
            password: passwordRef?.current?.value,
            passwordConfirm: passwordConfirmRef?.current?.value,
            gender: gender.toLowerCase(),
            disabled: enabled.toLowerCase()
        }
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
                    props.refreshData();
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

    return (
        <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
        >
            <div className="w-100" style={{ maxWidth: "800px" }}>
                <Card className='p-2'>
                    <Card.Body>
                        <h2 className='text-center mb-4'>Create a Teacher Account</h2>
                        {success && <Alert variant='success' onClose={() => setSuccess('')} dismissible>{success}</Alert>}
                        {error && <Alert variant='danger' onClose={() => setError('')} dismissible>{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col lg={6} md={6} s={6} xs={12}>
                                    <Form.Group className='mb-3'>
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control type='name' ref={firstNameRef} autoComplete='username' required />
                                    </Form.Group>
                                </Col>
                                <Col lg={6} md={6} s={6} xs={12}>
                                    <Form.Group className='mb-3'>
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control type='name' ref={lastNameRef} autoComplete='username' required />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group className='mb-3'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type='email' ref={emailRef} autoComplete='email' required />
                            </Form.Group>
                            <Row>
                                <Col lg={6} md={6} s={6} xs={12}>
                                    <Form.Group className='mb-3'>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type='password' ref={passwordRef} autoComplete='current-password' required />
                                    </Form.Group>
                                </Col>
                                <Col lg={6} md={6} s={6} xs={12}>
                                    <Form.Group className='mb-3'>
                                        <Form.Label>Password Confirmation</Form.Label>
                                        <Form.Control type='password' ref={passwordConfirmRef} autoComplete='current-password' required />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className='mb-2'>
                                <Col lg={4} md={6} s={6} xs={12}>
                                    <Form.Label className='mt-2'>Gender</Form.Label>
                                    <DropdownButton
                                        title={gender}
                                        variant='secondary'
                                        className='mb-3'
                                    >
                                        <Dropdown.Item onClick={() => { setGender('Male') }}>Male</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { setGender('Female') }}>Female</Dropdown.Item>
                                    </DropdownButton>
                                </Col>
                                <Col lg={4} md={6} s={6} xs={12}>
                                    <Form.Label className='mt-2'>Enabled/Disabled</Form.Label>
                                    <DropdownButton
                                        title={enabled}
                                        variant={enabled === 'Choose' ? 'secondary' : enabled === 'Enabled' ? 'success' : 'danger'}
                                        className='mb-3'
                                    >
                                        <Dropdown.Item onClick={() => { setEnabled('Enabled') }}>Enabled</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { setEnabled('Disabled') }}>Disabled</Dropdown.Item>
                                    </DropdownButton>
                                </Col>
                            </Row>
                            <div className='text-center'>
                                <Button disabled={loading} className='w-50 mt-3 mb-3' type='submit'>Create Account</Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>

            </div>
        </Container>
    )
}


