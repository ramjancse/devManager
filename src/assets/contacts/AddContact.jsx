import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import * as yup from 'yup';

const schema = yup.object({
  firstName: yup
    .string()
    .required('First Name is required')
    .min(3, 'Min Length must be greater than 3 Character'),
  lastName: yup
    .string()
    .required('last Name is required')
    .min(3, 'Min Length must be greater than 3 Character'),
  email: yup
    .string()
    .required('Email is required')
    .email('Must be a valid email'),
  profession: yup
    .string()
    .required('profession is required')
    .min(3, 'Min Length must be greater than 3 Character'),
  bio: yup
    .string()
    .required('Bio is required')
    .min(10, 'Min Length must be greater than 3 Character')
    .max(300, 'Max Length must be less than 300 Character'),
  image: yup
    .string()
    .required('Image is required')
    .url('Must be a URL'),
  gender: yup
    .string()
    .required('Gender is required')
    .oneOf(['male', 'female'])
    .nullable(),

})

function AddContact({ addContact }) {
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting,isSubmitted, isSubmitSuccessful } } = useForm({
    resolver: yupResolver(schema)
  });
  
  useEffect( () => {
    reset({
        firstName: '',
        lastName: '',
        email: '',
        profession: '',
        bio: '',
        image: '',
        image: 'male',
      })
  },[isSubmitSuccessful]);
  const [birthYear, setBirthYear] = useState(new Date()); 
  useEffect(() => {
    setValue('dateOfBirth', birthYear)
  },[birthYear]);
  
  const onsubmit = (data) => {
    console.log(data);
  }
     
    return (
        <>
        <h2 className='text-center'>Add Contact</h2>
        <Form onSubmit={handleSubmit(onsubmit)}>
          <Form.Group as={Row} className='mb-3'>
            <Col sm={3}>
              <Form.Label htmlFor='firstName' column>
                First Name
              </Form.Label>
            </Col>
            <Col sm={9}>
              <Form.Control
                type='text'
                defaultValue=''
                id='firstName'
                {...register('firstName')}
                isInvalid={ errors?.firstName}
                placeholder='Enter Your First Name'
              />
              <Form.Control.Feedback type='invalid' className='d-block'>
              {errors?.firstName?.message}
            </Form.Control.Feedback> 
            </Col>
          </Form.Group>

          <Form.Group as={Row} className='mb-3'>
            <Col sm={3}>
              <Form.Label htmlFor='lastName' column>
              Last Name
              </Form.Label>
            </Col>
            <Col sm={9}>
              <Form.Control
                type='text'
                defaultValue=''
                id='lastName'
                {...register('lastName')}
                isInvalid={ errors?.lastName}
                placeholder='Enter Your Last Name'
              />
              <Form.Control.Feedback type='invalid' className='d-block'>
              {errors?.lastName?.message}
            </Form.Control.Feedback> 
            </Col>
          </Form.Group>

          <Form.Group as={Row} className='mb-3'>
            <Col sm={3}>
              <Form.Label htmlFor='email' column>
              Email
              </Form.Label>
            </Col>
            <Col sm={9}>
              <Form.Control
                type='text'
                defaultValue=''
                id='email'
                {...register('email')}
                isInvalid={ errors?.email}
                placeholder='Enter Your Email'
              />
              <Form.Control.Feedback type='invalid' className='d-block'>
              {errors?.email?.message}
            </Form.Control.Feedback> 
            </Col>
          </Form.Group>

          <Form.Group as={Row} className='mb-3'>
            <Col sm={3}>
              <Form.Label htmlFor='profession' column>
              Profession
              </Form.Label>
            </Col>
            <Col sm={9}>
              <Form.Control
                type='text'
                defaultValue=''
                id='profession'
                {...register('profession')}
                isInvalid={ errors?.profession}
                placeholder='Enter Your Profession'
              />
              <Form.Control.Feedback type='invalid' className='d-block'>
              {errors?.profession?.message}
            </Form.Control.Feedback> 
            </Col>
          </Form.Group>
         
          <Form.Group as={Row} className='mb-3'>
            <Col sm={3}>
              <Form.Label htmlFor='gender' column>
                Gender{' '}
              </Form.Label>
            </Col>
            <Col xs='auto'>
              <Form.Check
                type='radio'
                label='Male'
                value='male'
                {...register('gender')}
               
              />
              <Form.Control.Feedback type='invalid' className='d-block'>
                {errors?.gender?.message}
              </Form.Control.Feedback> 
            </Col>

            <Col xs='auto'>
              <Form.Check
                type='radio'
                label='Female'
                value='female'
                {...register('gender')}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className='mb-3'>
            <Col sm={3}>
              <Form.Label htmlFor='image' column>
              image URL
              </Form.Label>
            </Col>
            <Col sm={9}>
              <Form.Control
                type='text'
                defaultValue=''
                id='image'
                {...register('image')}
                isInvalid={ errors?.image}
                placeholder='Enter Your image URL'
              />
              <Form.Control.Feedback type='invalid' className='d-block'>
              {errors?.image?.message}
            </Form.Control.Feedback> 
            </Col>
          </Form.Group>

          
          <Form.Group as={Row} className='mb-3'>
            <Col sm={3}>
              <Form.Label htmlFor='dateOfBirth' column>
                Date of Birth
              </Form.Label>
            </Col>
            <Col sm={9}>
              <DatePicker
               selected={birthYear}
                name='dateOfBirth'
                id='dateOfBirth'
                maxDate={new Date()}
                showYearDropdown
                placeholder='Enter your Date of birth'
                onChange={(date) => {
                  setBirthYear(date)
                }}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className='mb-3'>
            <Col sm={3}>
              <Form.Label htmlFor='bio' column>
              Bio 
              </Form.Label>
            </Col>
            <Col sm={9}>
              <Form.Control
                type='text'
                defaultValue=''
                id='bio'
                {...register('bio')}
                isInvalid={ errors?.bio}
                placeholder='Enter Your bio'
              />
              <Form.Control.Feedback type='invalid' className='d-block'>
              {errors?.bio?.message}
            </Form.Control.Feedback> 
            </Col>
          </Form.Group>

          
          
          
          <Button variant='primary' size='md' type='submit' disabled={ isSubmitting? 'disabled' :''}>
            Add Contact
          </Button>
        </Form>
      </>
  )
}

export default AddContact