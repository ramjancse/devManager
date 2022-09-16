import React, { useContext, useEffect } from 'react';
import { Container, Pagination } from 'react-bootstrap';
import Loader from '../assets/components/Loader';
import Contact from '../assets/contacts/Contact';
import { ContactContext } from '../context/Contact.context';
import Footer from '../layouts/Footer';
import Header from '../layouts/Header';

const generateArr = (num) => {
    let arr = [];
    for (let i = 1; i <= num; i++){
        arr.push(i)
    }
    return arr;
}
  
function Contacts() {
    const { contacts, loaded, pageNumber, pageCount,setPageNumber } = useContext(ContactContext)
    const pageCountArr = generateArr(pageCount);
    const isPgaeErrorOfBound = pageCount? pageNumber > pageCount : false;
    useEffect(() => {
        if (isPgaeErrorOfBound) {
            setPageNumber(pageNumber - 1)
        }
    }, [isPgaeErrorOfBound])
    
    const handlePageClick = (e) => {
        setPageNumber(+e.target.dataset.count)  
    }
    return (
        <>
           <Header/>
            <Container className='marginY'>
                <h2 className='mt-2 text-center'> All Contact</h2>
                {
                    loaded ? (
                        <>
                            {contacts.map((contact, index) => (
                                <Contact key={index} contact={contact} />
                            ))}
                            <Pagination style={{justyContent: 'center'}}>
                                {
                                    pageCountArr.map((count, index) => {
                                        return(
                                            <Pagination.Item
                                                key={index}
                                                active={count === pageNumber}
                                                data-count={count}
                                                onClick={handlePageClick}
                                            >
                                                {count}
                                            </Pagination.Item>
                                        )
                                   }) 
                                }
                            </Pagination>
                        </>
                    ) : (<Loader />)
                }
            </Container>
            <Footer/>
        </>
  )
}

export default Contacts