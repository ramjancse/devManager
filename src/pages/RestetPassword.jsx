import { yupResolver } from '@hookform/resolvers/yup';
import React, { useContext } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { axiosPublicInstance } from '../config/Axios';
import { AuthContext } from '../context/Auth.Context';
import Footer from '../layouts/Footer';
import FormTextInput from '../layouts/FormTextInput';
import Header from '../layouts/Header';

const schema = yup.object({
 
    password: yup
    .string()
    .required()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Minimum 6 characters, at least one letter and one number:'),
  
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], 'Password does not match'),
 
})


function RestetPassword () {
  const { handleSubmit, register, formState: { errors, isSubmitting, isSubmitted, isSubmitSuccessful} } = useForm({
      resolver: yupResolver(schema)
  });
    const { login } = useContext(AuthContext);
    const [searchParams] = useSearchParams()
    const code = searchParams.get('code');
    const navigate = useNavigate()
  
  const onSubmit = async (data) => {
      try {
        const response = await axiosPublicInstance.post('/auth/reset-password', {
            code: code,
            password: data.password,
            passwordConfirmation : data.confirmPassword
        });
        console.log(response.data);
        toast.success('Password changed suscesfully');
        navigate('/login')

      } catch (error) {
          console.log(error);
          toast.error('Something went wrong')
      }
   
  }
  return (
      <>
      <Header />
        <Container className='marginY mainContent'>
        <h1 className='text-center'> RestetPassword  </h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
         
         
          <FormTextInput
            name='password'
            label='Password'
            type='password'
            placeholder='Enter Password'
            errors={errors}
            register={register}
            defaultValue='$#Npr24191717$#'
          />
          <FormTextInput
            name='confirmPassword'
            type='password'
            label='Confirm Password'
            placeholder='Confirm Password'
            errors={errors}
            register={register}
            defaultValue='$#Npr24191717$#'
          />
          
       
         <Button variant='primary' size='md' type='submit'> Reset Pasword </Button>
        </Form>
        </Container>
      <Footer />

        
      </>
  )
}

export default RestetPassword 