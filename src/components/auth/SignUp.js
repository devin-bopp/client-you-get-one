// import React, { Component } from 'react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { signUp, signIn } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

const SignUp = (props) => {
	// constructor(props) {
	// 	super(props)

	// 	this.state = {
	// 		email: '',
	// 		password: '',
	// 		passwordConfirmation: '',
	// 	}
	// }    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    const navigate = useNavigate()

	const onSignUp = (event) => {
		event.preventDefault()

		const { msgAlert, setUser } = props

        const credentials = {email, password, passwordConfirmation}

		signUp(credentials)
			.then(() => signIn(credentials))
			.then((res) => setUser(res.data.user))
			.then(() =>
				msgAlert({
					heading: 'Sign Up Success',
					message: messages.signUpSuccess,
					variant: 'success',
				})
			)
			.then(() => navigate('/new-profile'))
			.catch((error) => {
                setEmail('')
                setPassword('')
                setPasswordConfirmation('')
				msgAlert({
					heading: 'Sign Up Failed with error: ' + error.message,
					message: messages.signUpFailure,
					variant: 'danger',
				})
			})
	}


    return (
        <>
            <h3>Sign Up</h3>
            <form onSubmit={onSignUp}>
                <label>Email address</label>
                <input
                    required
                    type='email'
                    name='email'
                    value={email}
                    placeholder='Enter email'
                    onChange={e => setEmail(e.target.value)}
                />
                <label>Password</label>
                <input
                    required
                    name='password'
                    value={password}
                    type='password'
                    placeholder='Password'
                    onChange={e => setPassword(e.target.value)}
                />
                <label>Password Confirmation</label>
                <input
                    required
                    name='passwordConfirmation'
                    value={passwordConfirmation}
                    type='password'
                    placeholder='Confirm Password'
                    onChange={e => setPasswordConfirmation(e.target.value)}
                />
                <input type='submit' value='Submit' />
            </form>
        </>
    )

}

export default SignUp