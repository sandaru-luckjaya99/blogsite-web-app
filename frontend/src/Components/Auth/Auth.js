import Axios from 'axios';
import React, { Component } from 'react'
// import { Alert } from 'react-bootstrap';
import { withRouter } from 'react-router-dom'
import validateForm from '../../utils/validateform'
import validEmailRegex from '../../utils/emailRegex'
import './Auth.css'
import { AuthContext } from '../../context/auth-context'
import Spinner from '../../Containers/Spinner/Spinner';
import logimg from '../../assets/logg.png'
import log from '../../assets/log.png'
// import design from '../../Containers/animation/design';
export class Auth extends Component {
    static contextType = AuthContext
    constructor(props) {
        super(props)

        this.state = {
            user: {
                email: '',
                password: ''
            },
            error: {
                message: '',
                code: ''
            },
            isloading: false,
            isLoginMode: true,

            errors: {
                email: '',
                password: ''
            }
        }
    }


    mySubmitHandler = (event) => {
        this.setState(pre => ({
            isloading: true
        }))
        const auth = this.context
        event.preventDefault();

        if (validateForm(this.state.errors)) {
        } else {
        }
        if (this.state.isLoginMode) {
            Axios.post('/user/login', this.state.user)
                .then(response => {
                    this.setState(pre => ({
                        isloading: false
                    }))
                    this.props.history.push('/')
                    auth.login(response.data.userId, response.data.token);
                    return Axios.get('/profile/viewprofile')
                }).then(data => {
                    let profile = data.data.profile.username
                    localStorage.setItem(
                        'profileData',
                        JSON.stringify({
                            "username": profile
                        }))


                }).catch(e => {

                    this.setState({
                        isloading: false,
                        error: {
                            ...this.state.error, message: e.response.data.message,
                            code: e.response.status
                        }
                    });
                })

        }
        else {
            this.setState(pre => ({
                isloading: true
            }))
            Axios.post('/user/signup', this.state.user).then(response => {
                this.setState(pre => ({
                    isloading: false
                }))
            })
                .catch(e => {
                    this.setState({ error: true });
                })
        }
        this.setState({
            user: { ...this.state.user, email: '', password: '' }
        });
    }


    myChangeHandler = (event) => {

        let nam = event.target.name;
        let val = event.target.value;
        let errors = this.state.errors;
        const { name, value } = event.target;
        switch (name) {

            case 'email':
                if (value.length === 0) {
                    errors.email =
                        value.length < 5
                            ? 'Email is Required!'
                            : '';
                    break;
                }
                if (value.length > 0) {
                    errors.email =
                        validEmailRegex.test(value)
                            ? ''
                            : 'Email is not valid!';
                    break;
                }
                break;
            case 'password':
                if (value.length > 0) {
                    errors.password =
                        value.length < 6
                            ? 'Password must be 6 characters long!'
                            : '';
                }

                if (value.length === 0) {
                    errors.password =
                        value.length === 0
                            ? 'Password is required!'
                            : '';
                }
                break;
            default:
                break;
        }

        this.setState({ errors, user: { ...this.state.user, [nam]: val } }, () => {
        });
    }

    switchLoginhandler = () => {
        this.setState(pre => ({
            isLoginMode: !pre.isLoginMode
        }))
    }

    render() {
        let isLoading
        let iserror

        if (this.state.isloading) {
            isLoading = (
                <>
                    <div className="container loading">
                        <div className="mar-20">
                            <Spinner />
                        </div>
                    </div>
                </>
            )
        }


        if (this.state.error.code) {
            iserror = (
                <>
                    <div className="container error container-short">
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>{this.state.error.message}</strong> You should check your email and password !!!.
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    </div>

                </>
            )
        }
        return (<>

            {isLoading}
            

            <div className="container container-short py-5">
                {/* <design></design> */}
                <img  className="img-fluid mx-auto d-block max-width: 5% max-height: 5%" alt="img" src= {this.state.isLoginMode ? log : logimg} />
                <h2 className="text-center mt-4"> Let's {this.state.isLoginMode ? 'Sign-in ' : 'Sign-up'}</h2>
                {iserror}
                {/* <hr></hr> */}
                <div></div>
                <form onSubmit={this.mySubmitHandler} className="pt-4">
                    <div className="form-group">
                        <label htmlFor="email">Email </label>
                        <input
                            type='email'
                            name='email'
                            value={this.state.user.email}
                            className={"form-control " + (this.state.errors.email ? 'is-invalid' : '')}
                            placeholder="Enter your email"
                            required
                            onChange={this.myChangeHandler}
                        />
                        {this.state.errors.email.length > 0 &&
                            <div className="mt-1"><span className='error text-danger'>{this.state.errors.email}</span></div>}
                    </div>

                    <div className="form-group">
                        {console.log("this happen")}
                        <label htmlFor="password">Password </label>
                        <input
                            type='password'
                            name='password'
                            value={this.state.user.password}
                            className={"form-control " + (this.state.errors.password ? 'is-invalid' : '')}
                            placeholder="Enter your Password"
                            required="required"
                            data-error="Please enter your full name."
                            onChange={this.myChangeHandler}
                        />
                        {this.state.errors.password.length > 0 &&
                            <div className="mt-1"> <span className='error text-danger'>{this.state.errors.password}</span></div>}

                    </div>

                    <div className="form-group">
                        <button style={{background: ' #123597 ', marginRight: '15px', maxwidth:'fit-content' }}
                            type='submit'
                            className="btn btn-primary"
                            disabled={this.state.user.email && this.state.user.password
                                && (validateForm(this.state.errors)) ? '' : 'disabled'}
                        >
                            {this.state.isLoginMode ? 'Sign-in' : 'Sign-up'}
                        </button>

                        <button style={{background: '#123597' , marginRight: '15px', align:'right' }}
                            type='button'
                            className="btn btn-primary"
                            onClick={this.switchLoginhandler}
                        >Switch to {this.state.isLoginMode ? 'Sign-up' : 'Sign-in'} </button>
                    </div>
                </form>

            </div>
        </>
        )
    }
}

export default withRouter(Auth)