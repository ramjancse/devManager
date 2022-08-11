import React from 'react'
import Contact from './Contact'

function Contacts({ contacts, deleteContact,addContact}) {
 
    return (
        <>  <h2 className='mt-2 text-center'> All Contact</h2>
            {
                contacts.map((contact) => (<Contact key={contact.id} contact={contact} deleteContact={deleteContact}
                    
                />)) 
            }
        </>
  )
}

export default Contacts