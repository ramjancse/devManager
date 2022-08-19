import React from 'react'
import { Container } from 'react-bootstrap'
import Footer from '../layouts/Footer'
import Header from '../layouts/Header'
function Login() {
  return (
      <>
          <Header />
          <Container className='marginY'>
            <h1 className='text-center'> Login </h1>
      </Container>
      <Footer/>
         
      </>
  )
}

export default Login