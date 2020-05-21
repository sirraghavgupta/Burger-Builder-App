import React, { useEffect, useState } from 'react';
import Aux from '../Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, setError] = useState(null);

    // run before mounting
    // i need to correct this - course wale ne nahi liya.
    const reqInterceptor = axios.interceptors.request.use(
      (request) => {
        console.log('inside request success method.');
        setError(null);
        return request;
      },
      (error) => {
        console.log('inside request failure method');
        return Promise.reject(error);
      }
    );

    const resInterceptor = axios.interceptors.response.use(
      (response) => {
        console.log('inside the success response method');
        return response;
      },
      (error) => {
        console.log('inside the faliure response block');
        setError(error);
        return Promise.reject(error);
      }
    );

    // run on unmounting.
    // i need to correct this. course wale ne nahi kiya.
    useEffect(() => {
      return () => {
        axios.interceptors.request.eject(reqInterceptor);
        axios.interceptors.response.eject(resInterceptor);
      };
    }, [reqInterceptor, resInterceptor]);

    const errorConfirmedHandler = () => {
      setError(null);
    };

    return (
      <Aux>
        <Modal show={error} modalClosed={errorConfirmedHandler}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
};

export default withErrorHandler;
