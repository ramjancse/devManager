import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import * as yup from 'yup';
import FormTextInput from '../../layouts/FormTextInput';


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
    .oneOf(['developer','designer','marketer'])
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

function ContactForm({ addContact, updateContact, contact }) {
 
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting,isSubmitted, isSubmitSuccessful } } = useForm({
    resolver: yupResolver(schema)
    });
  
  const navigate = useNavigate();
  const defaultValue = {
    firstName: contact?.firstName || 'Ramjan',
    lastName: contact?.lastName || 'Ali',
    email: contact?.email || 'ramjan2k21@gmail.com',
    gender: contact?.gender || 'male',
    profession: contact?.profession || 'developer',
    bio: contact?.bio || 'I beleive in quality',
    image: contact?.image || 'https://randomuser.me/api/portraits/women/75.jpg',
    dateOfBirth: (contact?.dateOfBirth && new Date(contact?.dateOfBirth)) || new Date(),
  }
  
  const { firstName, lastName, email, gender, profession, bio, image , dateOfBirth} = defaultValue
  
  // useEffect( () => {
  //   reset({
  //       firstName: '',
  //       lastName: '',
  //       email: '',
  //       profession: '',
  //       bio: '',
  //       image: '',
  //       gender: '',
  //     })
  // }, [isSubmitSuccessful]);
  
  const [birthYear, setBirthYear] = useState(new Date()); 
  
  useEffect(() => {
    setValue('dateOfBirth', birthYear)
  },[birthYear]);
  
  const onsubmit = (data) => {
    
    const id = contact?.id;
    if (id) {
      updateContact(data, id);
     
    } else {
      addContact(data);
    }
  
  }
     
    return (
      <>
        <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
     
        <Container className='marginY'>
          <h2 className='text-center'> { contact?.id? 'Edit Contact': 'Add Contact'} </h2>
          <Form onSubmit={handleSubmit(onsubmit)}>
           
            <FormTextInput
              name='firstName'
              label='First Name'
              placeholder='Enter Your First Name'
              errors={errors}
              register={register}
              defaultValue={ firstName }
            />

            <FormTextInput
              name='lastName'
              label='Last Name'
              placeholder='Enter Your last Name'
              errors={errors}
              register={register}
              defaultValue={ lastName }
            />
            <FormTextInput
              name='email'
              label='Email'
              placeholder='Enter Your Email Address'
              errors={errors}
              register={register}
              defaultValue={ email }
            />
            <FormTextInput
              name='profession'
              label='Profession'
              placeholder='Enter Your Profession'
              errors={errors}
              register={register}
              defaultValue={ profession }
            />
            
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
                  defaultChecked={ gender === 'male'}
               
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
                defaultChecked={ gender === 'female'}
                {...register('gender')}
              />
            </Col>
            </Form.Group>
            
            <FormTextInput
              name='image'
              label='image url'
              placeholder='Enter Your image url'
              errors={errors}
              register={register}
              defaultValue={ image }
            />

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
                as='textarea'
                type='text'
                defaultValue={ bio}
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
          { contact?.id? 'Update Contact': 'Add Contact'}
          </Button>
        </Form>
        </Container>
        
      </>
  )
}

export default ContactForm