import React from 'react'
import { Container } from 'react-bootstrap'
import ContactForm from '../assets/contacts/ContactForm'
import Footer from '../layouts/Footer'
import Header from '../layouts/Header'

function AddContact({ addContact}) {
  return (
      <>
        <Header/>
        <Container>
              <ContactForm addContact={ addContact} />
      </Container>
      <Footer/>
      </>
  )
}

export default AddContact