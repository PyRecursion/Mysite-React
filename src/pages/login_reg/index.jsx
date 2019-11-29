import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'


import './login_reg.less'
import Login from './login';
import Reg from './reg';


export default class Login_reg extends Component {
    render() {
        return (
            <div className='login_reg'>
                <video src="\videos\bg2.mp4" autoPlay muted loop>
                </video>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/reg" component={Reg} />
                </Switch>
            </div>
        )
    }
}
