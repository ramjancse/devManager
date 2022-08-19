import React from 'react'
import { Container } from 'react-bootstrap'
import Header from '../layouts/Header'

function Register() {
  return (
      <>
          <Header />
          <Container className='marginY'>
            <h1 className='text-center'> Register</h1>
      </Container>
      <Footer/>
        
      </>
  )
}

export default Register