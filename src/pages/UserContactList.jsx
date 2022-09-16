import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/Auth.Context';
import { ContactContext } from '../context/Contact.context';



function UserContactList() {
  const { loaded, userContacts,setTriggerdelete } = useContext(AuthContext)
  const { deleteContact } = useContext(ContactContext)
  
  const handleDelete = (id) => {
    deleteContact(id)
    setTriggerdelete(true)
  }
  return (
    <>
      {
        loaded && (
          <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Profession</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
        <tbody>
          {
            userContacts && userContacts.map((userContact, id) => {
              return (
                <tr key={id}>
                  <td>{userContact.id }</td>
                  <td>{ userContact.firstName}</td>
                  <td>{ userContact.lastName}</td>
                  <td>{ userContact.email}</td>
                  <td>{ userContact.profession}</td>
                  <td>
                    <Button
                      variant='secondary'
                      as={Link}
                      to={`/edit-contact/${userContact.id}`}
                    >
                      Edit
                    </Button>
                      
                  </td>
                  <td><Button variant='danger' onClick={()=>handleDelete(userContact.id)}> Delete </Button></td>
                 
                </tr>
               )
             })   
          }    
      </tbody>
    </Table>
        )
      }
    </>
  )
}

export default UserContactList