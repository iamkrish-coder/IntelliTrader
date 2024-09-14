import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./login-page.css"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
    const navigate = useNavigate()

    const openRegistration = () => {
        navigate("/signup");
    }
    return (
        <div className="login-page-container d-flex align-items-center justify-content-center min-vh-100">
            <Form className="login-page-form">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>

              <Button variant="info" onClik={ openRegistration }>
                Register
              </Button>

            </Form>
        </div>

    )
}

export default LoginPage;