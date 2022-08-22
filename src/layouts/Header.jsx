import React from 'react';
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
function Header() {
  return (
   
    
    <Navbar bg='light' expand='lg'>
    <Container>
      <Navbar.Brand href='#' className='brand'>
        Dev Manager
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='navbarScroll' />
      <Navbar.Collapse id='navbarScroll'>
        <Nav
          className='me-auto my-2 my-lg-0'
          style={{ maxHeight: '100px' }}
          navbarScroll
              >
         
          <NavLink to='/home' className="nav-link">Home</NavLink>
          <NavLink to='/about' className="nav-link">About</NavLink>
          <NavLink to='/contacts' className="nav-link">Contacts</NavLink>
          <NavLink to='/addcontact' className="nav-link">Add Contacts</NavLink>
          <NavLink to='/register' className="nav-link">Register</NavLink>
          <NavLink to='/login' className="nav-link">Login </NavLink>
        </Nav>
        <Form className='d-flex'>
          <Form.Control
            type='search'
            placeholder='Search'
            className='me-2'
            aria-label='Search'
          />
          <Button variant='outline-success'>Search</Button>
        </Form>
      </Navbar.Collapse>
    </Container>
    </Navbar>
  )
}

export default Header