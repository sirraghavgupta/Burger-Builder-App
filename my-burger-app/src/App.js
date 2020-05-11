import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import { Route, Switch} from 'react-router-dom';

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

        <Switch>
          <Route path = "/checkout" component = {Checkout} />
          <Route path = "/orders" component = {Orders} />
          <Route path = "/" component = {BurgerBuilder} />
        </Switch>
    
      </Layout>
    );
  }
}

export default App;
