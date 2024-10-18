import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Container, Button, Card, Col, Form, Row } from "react-bootstrap";
import { toast } from 'sonner'; 

const Login = ({ assets }) => {
    const { ICONS, IMAGES } = assets;
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [validated, setValidated] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Validation logic for email format
    const isEmailValid = (email) => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();   

        const form = e.currentTarget;
        setValidated(true);
        if (form.checkValidity() === false) {
            toast.error("Please provide the required information!"); 
            return;
        }
        
        // Check if email is valid
        if (!isEmailValid(formData.email)) {
            toast.error("Please provide a valid email address!");
            return;
        }

        // Handle sign in logic here (e.g., API call)
        console.log('Form submitted:', formData);
        toast.success("Logged in successfully!"); 

    };

    return (
        <Container className="page-sign">
            <Card className="card-sign">
                <Card.Header>
                    <img src={ICONS.Favicon24} alt="IntelliTrader" className="header-logo mb-2 mr-2" />
                    <Link to="/" className="header-logo mb-4">IntelliTrader</Link>
                    <Card.Title>Sign In</Card.Title>
                    <Card.Text>Welcome back! Please signin to continue.</Card.Text>
                </Card.Header>
                <Card.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit} method="get" action="/dashboard/finance">
                        <Row className="mb-3">
                            <Form.Group md="4" controlId="email">
                                <Form.Label >Email address</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter your email address" 
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group md="4" controlId="password">
                                <Form.Label className="d-flex justify-content-between">Password 
                                    <Link to="">Forgot password?</Link>
                                </Form.Label>
                                <Form.Control 
                                    type="password" 
                                    placeholder="Enter your password"
                                    name="password"  
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Row>
                        <Button type="submit" variant="primary" className="btn-sign">Sign In</Button>

                        {/* <div className="divider"><span>or sign in with</span></div>

                        <Row className="gx-2">
                           <Col><Button variant="" className="btn-facebook"><i className="ri-facebook-fill"></i> Facebook</Button></Col>
                           <Col><Button variant="" className="btn-google"><i className="ri-google-fill"></i> Google</Button></Col>
                        </Row> */}
                    </Form>
                </Card.Body>
                <Card.Footer>
                    Don't have an account? <Link to="/register">Create an Account</Link>
                </Card.Footer>
            </Card>
        </Container>
    )
}

export default Login