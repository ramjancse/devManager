import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import Loader from '../assets/components/Loader';
import Contact from '../assets/contacts/Contact';
import { ContactContext } from '../context/Contact.context';
import Footer from '../layouts/Footer';
import Header from '../layouts/Header';

  
function Contacts() {
      const {contacts, loaded } = useContext(ContactContext)
    return (
        <>
           <Header/>
            <Container className='marginY'>
                <h2 className='mt-2 text-center'> All Contact</h2>
                {
                    loaded ?(
                        contacts.map((contact, index) => (<Contact key={index} contact={contact} />))
                    ) : (<Loader />)
                }
            </Container>
            <Footer/>
        </>
  )
}

export default Contacts