import React, { useState } from 'react';
import { Row, Card, Button, Form, Container } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner'; 

const Register = ({ assets }) => {
    const { ICONS, IMAGES } = assets;
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '' 
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
        
        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        // Handle registration logic here (e.g., API call)
        console.log('Form submitted:', formData);
        toast.success("Registration successful!"); 
        navigate('/login'); 
    };

    return (
        <Container className="page-sign">
            <Card className="card-sign">
                <Card.Header>
                    <img src={ICONS.Favicon24} alt="IntelliTrader" className="header-logo mb-2 mr-2" />
                    <Link to="/" className="header-logo mb-4">IntelliTrader</Link>
                    <Card.Title>Sign Up</Card.Title>
                    <Card.Text>It's free to signup and only takes a minute.</Card.Text>
                </Card.Header>
                <Card.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit} method="post">
                        <Row className="mb-3">
                            <Form.Group md="4" controlId="username">
                                <Form.Label>Full name</Form.Label>
                                <Form.Control  
                                    type="text" 
                                    placeholder="Enter your full name" 
                                    name="username" 
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">Please enter your full name</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group md="4" controlId="email">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter your email address" 
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">Please enter a valid email address</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group md="4" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    placeholder="Enter your password" 
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">Please enter a password</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group md="4" controlId="confirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control 
                                    type="password" 
                                    placeholder="Confirm your password" 
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">Please confirm your password</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-4">
                            <small>By clicking <strong>Create Account</strong> below, you agree to our terms of service and privacy statement.</small>
                        </Row>
                        <Button type="submit" variant="primary" className="btn-sign">Create Account</Button>
                    </Form>
                </Card.Body>
                <Card.Footer>
                Already have an account? <Link to="/login">Sign In</Link>
                </Card.Footer>
            </Card>
        </Container>
    );
};

export default Register;
