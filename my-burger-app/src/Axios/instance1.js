import Axios from 'axios';

/**
 * we are creating our own instance here, because we will need a different
 * base url different purposes like authentication. ,
 * so, we will need separate one for all.
 */

const instance = Axios.create({
  baseURL: 'https://my-burger-app-e5ba5.firebaseio.com/',
});

export default instance;
