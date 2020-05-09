import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {

    return class extends Component{

        state = {
            error : null
        }

        componentWillMount = () => {    
            /**
             * whenever we send a request, first it comes to this place. 
             * here we can modify that, add some headers etc. 
             * then we return thre request to send and if there is any error,
             * then it goes to second error wala method. 
             */

            axios.interceptors.request.use( request => {
                console.log("inside request success method.");
                this.setState({error : null});
                return request;
            }, error => {
                console.log("inside request failure method");
                // it also redirects it to the catch block.
                return Promise.reject(error);
            });

            /**
             * now, whenever a response comes, it lands here. 
             * we can modify it here. and then we return thr response to the 
             * then block . 
             * if there is any response other than 2XX codem it goes to the 
             * error wala method. and there we reject it to the catch block. 
             */
            axios.interceptors.response.use( response => {
                console.log("inside the success response method");
                return response;
            }, 
                error => {
                    console.log("inside the faliure response block");
                    this.setState({ error : error });
                    /**
                     * if i dont write this, it will return to the then block, 
                     * now, it will go to the catch block. 
                     */
                    return Promise.reject(error);
            });
        }

        errorConfirmedHandler = () => {
            this.setState( { error : null } );
        }

        render(){
            return ( 
                <Aux>
                    <Modal show = { this.state.error }
                           modalClosed = { this.errorConfirmedHandler } >
                        { this.state.error ? this.state.error.message : null }
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;