import React, { useContext, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import Loader from '../assets/components/Loader';
import { axiosPrivetInstance } from '../config/Axios';
import { AuthContext } from '../context/Auth.Context';
const uploadPercentage = (loaded, completed) => {
  return Math.floor(((completed / loaded) * 100));
}

function Profile() {
  const { user, token} = useContext(AuthContext)
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [percentage, setPercentage] = useState();
  const [imageURL, setImageURL] = useState(null);
  
  const handleChange = (event) => {
    console.log(event.target.files)
    setFile(event.target.files[0]);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      firstName : 'ramjan',
      lastName: 'Ali',
      user: user.id,
    }

    const formData = new FormData();
    formData.append('files.profilePicture', file, file.name);
    formData.append('data', JSON.stringify(data));
    try {
      setSubmitting(true)
      const response = await axiosPrivetInstance(token).post('/profiles?populate=*', formData,
        {
          onUploadProgress: (progress) => {
            const percentage = uploadPercentage(progress.total, progress.loaded);
            setPercentage(percentage)
          }
        }
      );
      setImageURL(response.data.data.attributes.profilePicture.data.attributes.url);
      setSubmitting(false)
      console.log(response.data)
    } catch (error) {
      console.log(error.response);
    }
    
  }
  
  return (
    <>
    
      <Container>
        <h1> User Info </h1>
        <p> User Name : { user.username}</p>
        <p> User Email : {user.email}</p>
        <Form onSubmit={handleSubmit}>
          <label htmlFor='profilePicture'> Profile Picture</label>
            <input
              type='file'
              name='profilePicture'
            id='profilePicture'
            accept='image/*'
              onChange={handleChange}
          />
          {imageURL && <img src={ imageURL} alt='Profile picture' className='customImage'/>}
          {percentage && submitting && <Loader />}
          <Button type='submit' variant='primary' disabled={submitting}> Upload </Button>
        </Form>
          
       
        
      </Container>


    </>
  )
}

export default Profile