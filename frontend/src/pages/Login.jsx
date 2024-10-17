import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Container, Button, Card, Col, Form, Row } from "react-bootstrap";

const Login = ({ assets }) => {
    const { ICONS, IMAGES } = assets;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Handle changes in the input field
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
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
                    <Form method="get" action="/dashboard/finance">
                        <div className="mb-4">
                            <Form.Label >Email address</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter your email address" 
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </div>
                        <div className="mb-4">
                            <Form.Label className="d-flex justify-content-between">Password <Link to="">Forgot password?</Link></Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Enter your password" 
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <Button type="submit" variant="primary" className="btn-sign">Sign In</Button>

                        {/*<div className="divider"><span>or sign in with</span></div>*/}

                        {/*<Row className="gx-2">*/}
                        {/*    <Col><Button variant="" className="btn-facebook"><i className="ri-facebook-fill"></i> Facebook</Button></Col>*/}
                        {/*    <Col><Button variant="" className="btn-google"><i className="ri-google-fill"></i> Google</Button></Col>*/}
                        {/*</Row>*/}
                    </Form>
                </Card.Body>
                <Card.Footer>
                    Don't have an account? <Link to="/signup">Create an Account</Link>
                </Card.Footer>
            </Card>
        </Container>
    )
}

export default Login