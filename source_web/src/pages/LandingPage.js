import React from 'react';
import Header from '../components/landing-page/Header';
import Layout from '../components/landing-page/Layout';
import Footer from '../components/landing-page/Footer';
import '../styles/landing-page.css'

const LandingPage = () => {
    return (
        <div className="landing-page">
            <Header/>
            <Layout/>
            <Footer/>
        </div>
    );
}

export default LandingPage;