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
 
  email: yup
    .string()
    .required()
    .email('Must be valid email'),

  password: yup
    .string()
    .required(),
 
})


function Login() {
  const { handleSubmit, register, formState: { errors, isSubmitting, isSubmitted, isSubmitSuccessful} } = useForm({
      resolver: yupResolver(schema)
  });
  const { login } = useContext(AuthContext);
  
  const onSubmit = (data) => {
    console.log(data);
    login({
      identifier: data.email,
      password : data.password
    });
  }
  return (
      <>
      <Header />
        <Container className='marginY mainContent'>
        <h1 className='text-center'> Login </h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          
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
          

         <Button variant='primary' size='md' type='submit'> Login </Button>
        </Form>
        </Container>
      <Footer />

        
      </>
  )
}

export default Login