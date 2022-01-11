// import React, { Component, Fragment } from 'react'
import React, { useState, useEffect, Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import apiUrl from './apiConfig'

// import AuthenticatedRoute from './components/shared/AuthenticatedRoute'
import AutoDismissAlert from './components/shared/AutoDismissAlert/AutoDismissAlert'
import Header from './components/shared/Header'
import RequireAuth from './components/shared/RequireAuth'

import Home from './components/pages/Home'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'
import CreateProfile from './components/pages/CreateProfile'
import Queue from './components/pages/Queue'

// socket.io client
const { io } = require('socket.io-client')

// THIS IS GOING TO HAVE TO CHANGE FOR DEPLOYMENT!!!!
export const socket = io('http://localhost:8000')

const App = () => {
	
	const [user, setUser] = useState(null)
	const [profile, setProfile] = useState(null)
	const [msgAlerts, setMsgAlerts] = useState([])
	
	const clearUser = () => {
		console.log('clear user ran')
		setUser(null)
	}

	const deleteAlert = (id) => {
		setMsgAlerts((prevState) => {
			return (prevState.filter((msg) => msg.id !== id))
		})
	}

	const msgAlert = ({ heading, message, variant }) => {
		const id = uuid()
		setMsgAlerts(() => {
			return (
				[{ heading, message, variant, id }]
			)
		})
	}

	// retrive current user's profile from the server
	const getProfile = () => {
		if (user != null) {
			console.log('this is user.token')
			console.log(user.token)
			fetch(apiUrl + '/profile', {
				headers: { 'Content-Type': 'application/JSON', 'Authorization': 'Bearer ' + user.token }
			})
				.then(profile => {
					return profile.json()
				})
				.then(profile => {
					setProfile(profile[0])
				})
				.catch(error => console.log(error))
		}
	}

	useEffect(() => {
		getProfile()
	}, [user])

	return (
		<Fragment>
			<Header user={user} />
			<Routes>
				<Route
					path='/'
					element={
						<Home
							msgAlert={msgAlert}
							setUser={setUser}
							user={user}
							profile={profile}
							getProfile={getProfile}
						/>
					}
				/>
				<Route
					path='/new-profile'
					element={
						<RequireAuth user={user}>
							<CreateProfile user={user} getProfile={getProfile} />
						</RequireAuth>
					}
				/>
				<Route
					path='/sign-up'
					element={<SignUp msgAlert={msgAlert} setUser={setUser} />}
				/>
				<Route
					path='/sign-in'
					element={<SignIn msgAlert={msgAlert} setUser={setUser} getProfile={getProfile} />}
				/>
				<Route
					path='/sign-out'
					element={
						<RequireAuth user={user}>
							<SignOut msgAlert={msgAlert} clearUser={clearUser} user={user} />
						</RequireAuth>
					}
				/>
				<Route
					path='/change-password'
					element={
						<RequireAuth user={user}>
							<ChangePassword msgAlert={msgAlert} user={user} />
						</RequireAuth>}
				/>
				<Route
					path='/queue'
					element={
						<RequireAuth user={user}>
							<Queue 
								user={user} 
								profile={profile} 
								// messageSend={messageSend}
								// messages={messages} 
							/>
						</RequireAuth>
					}
				/>
			</Routes>
			{msgAlerts.map((msgAlert) => (
				<AutoDismissAlert
					key={msgAlert.id}
					heading={msgAlert.heading}
					variant={msgAlert.variant}
					message={msgAlert.message}
					id={msgAlert.id}
					deleteAlert={deleteAlert}
				/>
			))}
		</Fragment>
	)
}

export default App
