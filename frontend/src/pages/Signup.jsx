import React, { useState } from 'react';
import { Card, Button, Form, Container } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

const Signup = ({ assets }) => {
    const { ICONS, IMAGES } = assets;
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '' // Added confirmPassword to state
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        // Handle signup logic here (e.g., API call)
        console.log('Form submitted:', formData);
        navigate('/login'); // Redirect to login after signup
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
                <div className="mb-3">
                    <Form.Label>Full name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter your full name" 
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter your email address" 
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Enter your password" 
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <small>By clicking <strong>Create Account</strong> below, you agree to our terms of service and privacy statement.</small>
                </div>
                <Button variant="primary" className="btn-sign">Create Account</Button>

                {/* <div className="divider"><span>or sign up using</span></div> */}

                {/* <Row className="gx-2">
                    <Col><Button variant="" className="btn-facebook"><i className="ri-facebook-fill"></i> Facebook</Button></Col>
                    <Col><Button variant="" className="btn-google"><i className="ri-google-fill"></i> Google</Button></Col>
                </Row> */}
                </Card.Body>
                <Card.Footer>
                Already have an account? <Link to="/login">Sign In</Link>
                </Card.Footer>
            </Card>
        </Container>
    );
};

export default Signup;
