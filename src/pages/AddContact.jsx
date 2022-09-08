import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import ContactForm from '../assets/contacts/ContactForm'
import { ContactContext } from '../context/Contact.context'
import Footer from '../layouts/Footer'
import Header from '../layouts/Header'

function AddContact() {
  const { addContact } = useContext(ContactContext);
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