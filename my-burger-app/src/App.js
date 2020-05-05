import React, { useState } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Backdrop from './components/UI/Backdrop/Backdrop';

function App() {

  let [ purchaseState, setPurchaseState ] = useState( { purchasing : false } );

  const purchaseHandler = () => {
    setPurchaseState( { purchasing : true } );
  }

  const purchaseCancelHandler = () => {
      setPurchaseState( { purchasing : false } );
  }

  return (
    <Layout>
      <Backdrop show = { purchaseState.purchasing } clicked = { purchaseCancelHandler }/>
      <BurgerBuilder  
        purchasing = { purchaseState.purchasing }
        order = { purchaseHandler }/>
    </Layout>
  );
}

export default App;
