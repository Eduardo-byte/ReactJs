import React from 'react'
import { Switch , Route } from 'react-router-dom'

import ProductRegister from './views/products/register'
import ListProducts from './views/products/list'
import Home from './views/home'

export default () => {
    return(
            <Switch>
                <Route exact path="/regist-products/:sku?" component={ProductRegister} replace/>
                <Route exact path="/list-products" component={ListProducts} replace/>
                <Route exact path="/" component={Home} replace/>
            </Switch>     
    )
}