import React,{useEffect} from 'react';
import HomePage from './containers/HomePage';
import './App.css';
import { AmazonContextProvider } from './Context/AmazonContext';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'
import ProductListPage from './containers/ProductListPage';
import Signin from './components/signin/signin';
import SignUp from './components/signup/signup';
import {useDispatch,useSelector} from 'react-redux';
import {isUserLoggedIn, updateCart} from './actions'
import ProductDetails from './containers/ProductDetails';
import CartPage from './containers/cart/cartPage';
import CheckoutPage from "./containers/CheckoutPage";
import OrderPage from "./containers/OrderPage";
import OrderDetailsPage from "./containers/OrderDetailsPage";


function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    if(!auth.authenticate){
      dispatch(isUserLoggedIn())
    }
  },[auth.authenticate])

  useEffect(() => {
    console.log("App.js - updateCart");
    dispatch(updateCart());
  }, [auth.authenticate]);


  return (
    <AmazonContextProvider>   
    <div className="App">
      
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/cart" component={CartPage} />
          <Route path="/checkout" component={CheckoutPage} />
          <Route path="/account/orders" component={OrderPage} />
          <Route path="/order_details/:orderId" component={OrderDetailsPage} />
          
          <Route path="/:productSlug/:productId/p" component={ProductDetails} />
          <Route path="/:slug" component={ProductListPage} />
        </Switch> 
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={SignUp} />
      </Router>
    </div>
    </AmazonContextProvider>
  );
}

export default App;
