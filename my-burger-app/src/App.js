import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

class App extends Component {

  // state = {
  //   show : true
  // };
  
  // componentDidMount = () => {
  //   setTimeout( ()=>{this.setState({ show : false }) } ,5000);
  // }

  render(){
    return (
      <Layout>
        {/* { this.state.show ? <BurgerBuilder/> : null } */}
        <BurgerBuilder/>
        <Checkout/>
      </Layout>
    );
  }
}

export default App;
