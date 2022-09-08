import { yupResolver } from '@hookform/resolvers/yup';
import React, { useContext } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { AuthContext } from '../context/Auth.Context';
import Footer from '../layouts/Footer';
import FormTextInput from '../layouts/FormTextInput';
import Header from '../layouts/Header';

const schema = yup.object({
  username: yup
    .string()
    .required()
    .min(5, 'username must be 5 or more character'),
  
  email: yup
    .string()
    .required()
    .email('Must be valid email')
    .lowercase(),
  
  password: yup
    .string()
    .required()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Minimum 6 characters, at least one letter and one number:'),
  
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], 'Password does not match'),
  
})


function Register() {
  const { handleSubmit, register, formState: { errors, isSubmitting, isSubmitted, isSubmitSuccessful} } = useForm({
      resolver: yupResolver(schema)
  });
  const { registerUser } = useContext(AuthContext);
  
  const onSubmit = (data) => {
   
    registerUser({
      username: data.username,
      email: data.email,
      password : data.password
    });
  }
  return (
      <>
      <Header />
        <Container className='marginY mainContent'>
        <h1 className='text-center'> Register </h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormTextInput
            name='username'
            label='User Name'
            placeholder='Enter Your User Name'
            errors={errors}
            register={register}
            defaultValue='ramjan'
          />
          <FormTextInput
            name='email'
            label='Email'
            placeholder='Enter Email Address'
            errors={errors}
            register={register}
            defaultValue='ramjan@gmail.com'
          />
          <FormTextInput
            name='password'
            label='Password'
            placeholder='Enter Password'
            errors={errors}
            register={register}
            defaultValue='$#Npr24191717$#'
          />
          <FormTextInput
            name='confirmPassword'
            label='Confirm Password'
            placeholder='Confirm Password'
            errors={errors}
            register={register}
            defaultValue='$#Npr24191717$#'
          />

         <Button variant='primary' size='md' type='submit'> Register </Button>
        </Form>
        </Container>
      <Footer />

        
      </>
  )
}

export default Register