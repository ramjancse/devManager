import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
function Footer({theme}) {
  return (
      <>
        <Navbar id={theme} expand='lg'>
          <Container>
            <p className='text-center'> @Copyright </p>
          </Container>
        </Navbar>
      </>
  )
}

export default Footer