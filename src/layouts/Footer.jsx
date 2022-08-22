import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
function Footer() {
  return (
      <>
        <Navbar bg='light' expand='lg'>
          <Container>
            <p className='text-center'> @Copyright </p>
          </Container>
        </Navbar>
      </>
  )
}

export default Footer