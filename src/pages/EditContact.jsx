import React from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import ContactForm from '../assets/contacts/ContactForm'
import Footer from '../layouts/Footer'
import Header from '../layouts/Header'

function EditContact({ contacts,updateContact}) {
    const params = useParams();
    const { id } = params;
    const foundContact = contacts.find((contact) => contact.id == id) 
   
    return (
      <>
        <Header/>
        <Container>
                <ContactForm updateContact={updateContact} contact={ foundContact} />
        </Container>
        <Footer/>
      </>
  )
}

export default EditContact