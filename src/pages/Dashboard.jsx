import React from 'react'
import { Container } from 'react-bootstrap'
import Footer from '../layouts/Footer'
import Header from '../layouts/Header'

function Dashboard() {
  return (
      <>
          <Header />
          <Container className='marginY mainContent'>
              <h1> Dashboard </h1>
          </Container>
          <Footer/>
      </>
  )
}

export default Dashboard