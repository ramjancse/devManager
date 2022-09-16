import { yupResolver } from '@hookform/resolvers/yup';
import React, { useContext } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { axiosPublicInstance } from '../config/Axios';
import { AuthContext } from '../context/Auth.Context';
import Footer from '../layouts/Footer';
import FormTextInput from '../layouts/FormTextInput';
import Header from '../layouts/Header';

const schema = yup.object({
  email: yup
    .string()
    .required()
    .email('Must be valid email')
})


function ForgotPassword() {
  const { handleSubmit, register, formState: { errors, isSubmitting, isSubmitted, isSubmitSuccessful} } = useForm({
      resolver: yupResolver(schema)
  });
  const { login } = useContext(AuthContext);
  
  const onSubmit = async (data) => {
   try {
    const response = await axiosPublicInstance.post('/auth/forgot-password', {
      email: data.email
    })
     toast.success('email is sent susceswsfully with email resent link');
   } catch (err) {
     console.log(err.response)
     toast.error('error')
   }
    
  }
  return (
      <>
      <Header />
        <Container className='marginY mainContent'>
        <h1 className='text-center'> Forgot Password </h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
         
          <FormTextInput
            name='email'
            label='Email'
            placeholder='Enter Email Address'
            errors={errors}
            register={register}
            defaultValue='ramjan@gmail.com'
          />
         
         <Button variant='primary' size='md' type='submit'> Reset Password </Button>
        </Form>
        </Container>
      <Footer />

        
      </>
  )
}

export default ForgotPassword