import React, { Component } from 'react';
import './Register.scss';
import Button from '../../../components/atoms/Button';
import { connect } from 'react-redux';
import { registerUSerAPI } from '../../../config/redux/action';
import { withRouter } from "react-router-dom";

class Register extends Component {
    state = {
        email: '',
        password: '',
    }

    handleChangeText = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleResgiterSubmit = async () => {
        const { email, password } = this.state;
        const res = await this.props.registerAPI({ email, password }).catch(err => err);
        if (res) {
            this.setState({
                email: '',
                password: ''
            });
        }
    }

    handleLogin = () => {
        this.props.history.push('/login')
    }

    render() {
        return (
            <div className="auth-container">
                <div className="auth-card">
                    <p className="auth-title">Register Page</p>
                    <input className="input" id="email" placeholder="Email" type="text" onChange={this.handleChangeText} value={this.state.email} />
                    <input className="input" id="password" placeholder="Password" type="password" onChange={this.handleChangeText} value={this.state.password} />
                    <Button onClick={this.handleResgiterSubmit} title="Register" loading={this.props.isLoading} />
                    <p className="message">Sudah Punya Akun? <span onClick={this.handleLogin}>Login</span></p>
                </div>
                {/* <button>Go to Dashboard</button> */}
            </div>
        )
    }
}

const reduxState = (state) => ({
    isLoading: state.isLoading
})

const reduxDispatch = (dispatch) => ({
    registerAPI: (data) => dispatch(registerUSerAPI(data))
})

export default connect(reduxState, reduxDispatch)(withRouter(Register));