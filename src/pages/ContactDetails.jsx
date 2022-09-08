import format from "date-fns/format";
import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Container, ListGroup } from 'react-bootstrap';
import { FaEye, FaPencilAlt, FaRegTrashAlt } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import { AuthContext } from "../context/Auth.Context";
import { ContactContext } from "../context/Contact.context";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";

function ContactDetails() {
    const { contacts,deleteContact} = useContext(ContactContext);
    const {user} = useContext(AuthContext);
    const [contact, setContact] = useState({});
    const { id } = useParams();
    const foundContact = contacts.find((contact) => contact.id === +id);
    
    
    
    const navigate = useNavigate()
    const isOwner = user.id === foundContact.author.data.id;
  

    const handleDelete = (id)=>{
       
        deleteContact(id)
        toast.success('contact deleted successfully');
        navigate('/contacts')
    }
    const { firstName, lastName, email,profession,gender, bio,dateOfBirth, image} = contact;
    
    useEffect(() => {
        if (id && foundContact) {
            setContact(foundContact);
        }
    }, [id]);

    
    
    return (
        <>
            <Header />
            <Container>
                <h1 className='text-center mb-3'> Contact Details </h1>
                {Object.keys(contact).length === 0 ? <p> No Contact to Show</p> :
                    <Card className='mb-3'>
                    <div className='d-flex'>
                    <Card.Img className='card-img' src={image} />
                    <Card.Body>
                    <Card.Title>
                        <span className='text-dark'>
                        {firstName} {lastName}
                        </span>
                    </Card.Title>
                    <Card.Subtitle className='mb-3 text-muted'>
                        {profession}
                    </Card.Subtitle>
                    <Card.Text>{bio}</Card.Text>
                    <ListGroup className='list-group-flush'>
                        <ListGroup.Item>Gender: {gender}</ListGroup.Item>
                        <ListGroup.Item> Email: {email}</ListGroup.Item>
                        <ListGroup.Item>Date of Birth: {dateOfBirth instanceof Object? format(dateOfBirth, "dd/MM/yyyy") : dateOfBirth }</ListGroup.Item>
                    </ListGroup>
                    { !isOwner &&
                        <Card.Link as={Link} to={`/contacts`}>
                        <Button variant='warning ms-3' size='md' type='view'>
                             Back
                        </Button>
                        </Card.Link>           
                    }
                               
                    {
                        isOwner && 
                            <div className='card-btn mt-3'>
                                <Card.Link as={ Link } to={`/edit-contact/${id}`}>
                                        <Button variant='warning ms-3' size='md' type='view'>
                                                <FaEye />   
                                        </Button>
                                        </Card.Link>
                                        <Card.Link as={ Link } to={`/edit-contact/${id}`}>
                                        <Button variant='warning ms-3' size='md' type='view'>
                                        <FaPencilAlt />   
                                        </Button>
                                    </Card.Link>
                                    <Card.Link>
                                       <Button
                                                variant='danger ms-3'
                                                size='md'
                                                onClick={() => handleDelete(id)}
                                            >
                                                <FaRegTrashAlt />
                                            </Button>
                                            </Card.Link>
                                            <Card.Link as={Link} to={`/contacts`}>
                        <Button variant='warning ms-3' size='md' type='view'>
                             Back
                        </Button>
                        </Card.Link>  
                                </div>              
                    }         
                    
                    </Card.Body>
                    </div>
                </Card>
                }  
            </Container>
            <Footer/>
        
    </>
  )
}

export default ContactDetails