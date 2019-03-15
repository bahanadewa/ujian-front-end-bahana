import React, { Component } from 'react';
import Navbar from './components/Navbar'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Product from './components/produkList'
import ManageProduct from './components/admin/manageproduct'
import PageNotFound from './components/pageNotFound'
import ProductDetail from './components/productDetail'
import { Route, withRouter, Switch } from 'react-router-dom'
import {connect} from  'react-redux'
import ScrollToTop from './components/scrollToTop'

import cookie from 'universal-cookie'
import {keepLogin} from './1.actions'
import './App.css';

// WITHROUTER => UNTUK TERSABUNG KE REDUCEER DENGAN CONNECT TAPI DI DALAM KOMPONEN ADA ROUTNG

const objCookie = new cookie ()
class App extends Component {
  componentDidMount(){
      var terserah = objCookie.get('userData')
      if (terserah !== undefined){
        this.props.keepLogin(terserah)
      }
      
  }
  render() {
    return (
      <div>
          <Navbar/>
          <ScrollToTop>
            <Switch>
              <Route path='/' component={Home} exact/>
              <Route path='/login' component={Login} exact/>
              <Route path='/register' component={Register} exact/>
              <Route path='/product' component={Product}/>
              <Route path='/manage' component={ManageProduct}exact />
              <Route path='/product-detail/:id' component={ProductDetail}exact />
              <Route path='*' component={PageNotFound} exact />    
            </Switch>
          </ScrollToTop>
          
      </div>
    );
  }
}

export default withRouter(connect (null,{keepLogin}) (App)) ;
