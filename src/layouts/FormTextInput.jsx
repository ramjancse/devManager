import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
function FormTextInput({ type='text',defaultValue,register,errors, label, name, placeholder}) {
  return (
      <>
        <Form.Group as={Row} className='mb-3'>
            <Col sm={3}>
                  <Form.Label htmlFor={ name} column>
                      { label}
              </Form.Label>
            </Col>
            <Col sm={9}>
              <Form.Control
                      type={type}
                      defaultValue={defaultValue}
                      id={name}
                      {...register(name)}
                      isInvalid={errors?.name}
                      placeholder={ placeholder}
              />
              <Form.Control.Feedback type='invalid' className='d-block'>
                {errors[name]?.message}
              </Form.Control.Feedback> 
            </Col>
          </Form.Group>
      </>
  )
}

export default FormTextInput