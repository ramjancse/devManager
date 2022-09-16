import { yupResolver } from '@hookform/resolvers/yup';
import React, { useContext } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { axiosPrivetInstance } from '../config/Axios';
import { AuthContext } from '../context/Auth.Context';
import Footer from '../layouts/Footer';
import FormTextInput from '../layouts/FormTextInput';

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


function ManagePassword () {
  const { handleSubmit, register, formState: { errors, isSubmitting, isSubmitted, isSubmitSuccessful} } = useForm({
      resolver: yupResolver(schema)
  });
    const { login } = useContext(AuthContext);
    const [searchParams] = useSearchParams()
    const code = searchParams.get('code');
    const navigate = useNavigate()
  
  const onSubmit = async (data) => {
      try {
        const response = await axiosPrivetInstance.post('/auth/change-password', {
            // code: code,
            currentPassword: data.currentPassword,
            password: data.password,
            passwordConfirmation: data.passwordConfirmation,
           
        });
       
        await console.log(response.data);
        toast.success('Password changed suscesfully');
        navigate('/login')

      } catch (error) {
          await console.log(error);
          toast.error('Something went wrong')
      }
   
  }
  return (
      <>
    
        <Container className='marginY mainContent'>
        <h1 className='text-center'> RestetPassword  </h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
        <FormTextInput
            name='currentPassword'
            label='Current Password'
            type='password'
            placeholder='Enter Current Password'
            errors={errors}
            register={register}
            defaultValue='$#Npr24191717$#'
          />
         
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

export default ManagePassword 