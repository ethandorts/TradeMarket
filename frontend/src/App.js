import React from 'react'
import Header from "./components/Header";
import { Container } from 'react-bootstrap';
import Footer from "./components/Footer";
import Home from "./pages/Home";


const App = () => {
  return (
    <>
    <Header />
      <main className='py-3'>
        <Container>
          <h1>TradeMarket</h1>
          <Home />
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default App;