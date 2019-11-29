
/*
应用根组件
*/

import React, { Component } from 'react'
import {HashRouter,Switch,Route} from 'react-router-dom'
import Login_reg from './pages/login_reg'
import Index from './pages/home'


export default class App extends Component {
    render() {
        return (
            <HashRouter >
                <Switch>
                    <Route path="/login" component={Login_reg} />
                    <Route path="/reg" component={Login_reg} />
                    <Route path="/" component={Index} />
                </Switch>
            </HashRouter>
        )
    }
}