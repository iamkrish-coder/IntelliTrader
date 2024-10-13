import { useNavigate } from 'react-router-dom'
import { Button, Container } from 'react-bootstrap';

const Home = ({ assets }) => {
    // Props Destructuring
    const { IMAGES, ICONS } = assets; 
    const navigate = useNavigate()

    return (
        <Container fluid className="home-container">
            <div className="home-background">
                <div className="home-overlay"></div>
            </div>
            <div className="home-content">
                <h1 className="home-title ">IntelliTrader</h1>
                <Button variant="primary" onClick={() => navigate('/login')}>
                    Get Started
                </Button>
            </div>
        </Container>
    )
}

export default Home;