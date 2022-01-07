import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { changePassword } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

const ChangePassword = (props) => {
	// constructor(props) {
	// 	super(props)

	// 	this.state = {
	// 		oldPassword: '',
	// 		newPassword: '',
	// 	}
	// }
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const navigate = useNavigate()

	const onChangePassword = (event) => {
		event.preventDefault()

		const { msgAlert, user } = props
        console.log('the user', user)
        

        const passwords = {oldPassword, newPassword}

		changePassword(passwords, user)
			.then(() =>
				msgAlert({
					heading: 'Change Password Success',
					message: messages.changePasswordSuccess,
					variant: 'success',
				})
			)
			.then(() => navigate('/'))
			.catch((error) => {
				setOldPassword('')
                setNewPassword('')
				msgAlert({
					heading: 'Change Password Failed with error: ' + error.message,
					message: messages.changePasswordFailure,
					variant: 'danger',
				})
			})
	}



    return (
        <div>
            <h3>Change Password</h3>
            <form onSubmit={onChangePassword}>
                <label for='oldPassword'>Old password</label>
                <input
                    required
                    id='oldPassword'
                    name='oldPassword'
                    value={oldPassword}
                    type='password'
                    placeholder='Old Password'
                    onChange={e => setOldPassword(e.target.value)}
                />
                <label for='newPassword'>New Password</label>
                <input
                    required
                    id='newPassword'
                    name='newPassword'
                    value={newPassword}
                    type='password'
                    placeholder='New Password'
                    onChange={e => setNewPassword(e.target.value)}
                />
                <input type='submit' value='Submit' />
            </form>
        </div>
    )
}

export default ChangePassword