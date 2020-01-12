import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import loginbg from "../../assets/images/login_bg.jpg"

import './login_reg.less'
import Login from './login';
import Reg from './reg';


export default class Login_reg extends Component {
    render() {
        return (
            <div className='login_reg'>
                    <img src={loginbg} alt="123"/>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/reg" component={Reg} />
                </Switch>
            </div>
        )
    }
}
