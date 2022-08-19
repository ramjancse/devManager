import React from 'react'
import { Container } from 'react-bootstrap'
import Footer from '../layouts/Footer'
import Header from '../layouts/Header'

function NotFound() {
  return (
      <>   
          <Header/>
          <Container>
              <h1 className='text-center marginY'> Page Not Found </h1>
      </Container>
      <Footer/>
      </>
  )
}

export default NotFound