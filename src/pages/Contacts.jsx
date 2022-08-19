import React from 'react';
import { Container } from 'react-bootstrap';
import Contact from '../assets/contacts/Contact';
import Footer from '../layouts/Footer';
import Header from '../layouts/Header';

  
function Contacts({ contacts, deleteContact}) {
      
    return (
        <>
           <Header/>
            <Container className='marginY'>
                <h2 className='mt-2 text-center'> All Contact</h2>
                {
                contacts.map((contact,index) => (<Contact key={index} contact={contact} deleteContact={deleteContact}       
                />)) 
                    }
            </Container>
            <Footer/>
        </>
  )
}

export default Contacts