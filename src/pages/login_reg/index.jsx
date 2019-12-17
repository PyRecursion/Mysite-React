import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'


import './login_reg.less'
import Login from './login';
import Reg from './reg';
import  img11111 from '../../assets/images/11111.jpg'

export default class Login_reg extends Component {
    render() {
        return (
            <div className='login_reg'>
                <img src={img11111} alt="123"/>
                {/* <video src="\videos\bg4.mp4" autoPlay muted loop>
                </video> */}
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/reg" component={Reg} />
                </Switch>
            </div>
        )
    }
}
