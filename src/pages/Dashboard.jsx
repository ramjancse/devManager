import React from 'react'
import { Container } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Row from 'react-bootstrap/Row'
import Tab from 'react-bootstrap/Tab'
import { NavLink, Outlet } from 'react-router-dom'
import Footer from '../layouts/Footer'
import Header from '../layouts/Header'


function Dashboard() {
  return (
      <>
          <Header />
          <Container className='marginY mainContent'>
              <h1> Dashboard </h1>
              <Outlet />
     <Tab.Container id="list-group-tabs-example">
      <Row>
        <Col sm={4}>
          <ListGroup>
            <ListGroup.Item action as={ NavLink} to="profile">
              Profile
            </ListGroup.Item>
            <ListGroup.Item action as={ NavLink} to="managae-password">
             Manage Password
            </ListGroup.Item>
            <ListGroup.Item action as={ NavLink} to="contacts">
             User Lists
            </ListGroup.Item>
        </ListGroup>
                         
        </Col>
        <Col sm={8}>
          <Tab.Content>
           {/* <Outlet/> */}
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
    </Container>
  <Footer />   
  </>
  )
}

export default Dashboard