import { useState, useEffect } from 'react';

export default (axios) => {
  const [error, setError] = useState(null);

  // run before mounting
  // i need to correct this - course wale ne nahi kiya.
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

  return [error, errorConfirmedHandler];
};

/**
 * it's not compulsory to return an array of size 2. we can return anything we
 * want, an object, a string, a number, an array of 5 elements.
 */