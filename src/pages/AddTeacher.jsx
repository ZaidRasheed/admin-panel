import useAddTeacher from '../hooks/useAddTeacher'
import { Col, Row, Container, Form, Button, Card, Dropdown, DropdownButton } from 'react-bootstrap'
import { useAdmin } from '../context/admin context/AdminContext'
export default function AddTeacher() {
    const { refreshData } = useAdmin()
    const {
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
    } = useAddTeacher(refreshData)

    return (
        <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
        >
            <div className="w-100" style={{ maxWidth: "800px" }}>
                <Card className='p-2'>
                    <Card.Body>
                        <h2 className='text-center mb-4'>Create a Teacher Account</h2>
                        {SuccessAlert}
                        {ErrorAlert}
                        <Form onSubmit={handleAddTeacher}>
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
                            <Form.Label className='mt-2'>Gender</Form.Label>
                            <DropdownButton
                                title={gender}
                                variant='secondary'
                                className='mb-3'
                            >
                                <Dropdown.Item onClick={setMale}>Male</Dropdown.Item>
                                <Dropdown.Item onClick={setFemale}>Female</Dropdown.Item>
                            </DropdownButton>
                            <Form.Label className='mt-2'>Enabled/Disabled</Form.Label>
                            <DropdownButton
                                title={enabled}
                                variant={enabled === 'Choose' ? 'secondary' : enabled === 'Enabled' ? 'success' : 'danger'}
                                className='mb-3'
                            >
                                <Dropdown.Item onClick={enable}>Enabled</Dropdown.Item>
                                <Dropdown.Item onClick={disable}>Disabled</Dropdown.Item>
                            </DropdownButton>
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


