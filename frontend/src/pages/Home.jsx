import { useNavigate } from 'react-router-dom'
import { Button, Container } from 'react-bootstrap';
import { useTypewriter, Cursor } from 'react-simple-typewriter'

const Home = ({ assets }) => {
    const { IMAGES, ICONS } = assets; 
    const navigate = useNavigate()

    const [heading] = useTypewriter({
        words: ['IntelliTrader'],
        loop: 3,
        typeSpeed: 100,
        deleteSpeed: 50,
        delaySpeed: 3000
      })

    return (
        <Container fluid className="home-container">
            <div className="home-background">
                <div className="home-overlay"></div>
            </div>
            <div className="home-content">
                <h1 className="home-title m-2">{heading}<Cursor cursorColor="red" cursorStyle='_' /></h1>
                <Button variant="primary" size="sm" className="m-2 px-2" onClick={() => navigate('/login')}>
                    <span>Get started</span>
                </Button>
            </div>
        </Container>
    )
}

export default Home;