import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUSerAPI } from '../../../config/redux/action';
import Button from '../../../components/atoms/Button';
import { withRouter } from "react-router-dom";

class Login extends Component {
    state = {
        email: '',
        password: '',
    }

    handleChangeText = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleLoginSubmit = async () => {
        const { email, password } = this.state;
        const res = await this.props.loginAPI({ email, password }).catch(err => err);
        if (res) {
            console.log('Login Succes', res)
            localStorage.setItem('userData', JSON.stringify(res))
            this.setState({
                email: '',
                password: ''
            })
            this.props.history.push('/')
        } else {
            alert('Login failed')
        }
    }

    handleRegist = () => {
        this.props.history.push('/register')
    }

    render() {
        return (
            <div className="auth-container">
                <div className="auth-card">
                    <p className="auth-title">Login Page</p>
                    <input className="input" id="email" placeholder="Email" type="text" onChange={this.handleChangeText} value={this.state.email} />
                    <input className="input" id="password" placeholder="Password" type="password" onChange={this.handleChangeText} value={this.state.password} />
                    <Button onClick={this.handleLoginSubmit} title="Login" loading={this.props.isLoading} />
                    <p className="message">Belum Punya Akun? <span onClick={this.handleRegist}>Daftar</span></p>
                </div>
            </div>
        )
    }
}

const reduxState = (state) => ({
    isLoading: state.isLoading
})

const reduxDispatch = (dispatch) => ({
    loginAPI: (data) => dispatch(loginUSerAPI(data))
})

export default connect(reduxState, reduxDispatch)(withRouter(Login)); 