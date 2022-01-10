import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { signIn } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

const SignIn = (props) => {
	// constructor(props) {
	// 	super(props)

	// 	this.state = {
	// 		email: '',
	// 		password: '',
	// 	}
	// }
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

	// handleChange = (event) =>
	// 	this.setState({
	// 		[event.target.name]: event.target.value,
	// 	})

	const onSignIn = (event) => {
		event.preventDefault()
        console.log('the props', props)
		const { msgAlert, setUser } = props

        const credentials = {email, password}

		signIn(credentials)
			.then((res) => setUser(res.data.user))
			.then(() => {
				msgAlert({
					heading: 'Sign In Success',
					message: messages.signInSuccess,
					variant: 'success',
				})
                props.getProfile()
            })
			.then(() => {
                if (!props.profile) {
                    navigate('/new-profile')
                } else {
                    navigate('/')
                }
            })
			.catch((error) => {
                setEmail('')
                setPassword('')
				msgAlert({
					heading: 'Sign In Failed with error: ' + error.message,
					message: messages.signInFailure,
					variant: 'danger',
				})
			})
	}

    return (
        <>
            <h3>Sign In</h3>
            <form onSubmit={onSignIn}>
                <label for='email'>Email address</label>
                <input
                    required
                    type='email'
                    name='email'
                    id='email'
                    value={email}
                    placeholder='Enter email'
                    onChange={e => setEmail(e.target.value)}
                />
                <label for='password'>Password</label>
                <input
                    required
                    name='password'
                    id='password'
                    value={password}
                    type='password'
                    placeholder='Password'
                    onChange={e => setPassword(e.target.value)}
                />
                <input type='submit' value='Submit' />
            </form>
        </>
    )
}

export default SignIn
