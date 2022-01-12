import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const authenticatedOptions = (
	<>
		<li>
			<Link to='new-profile'>Create Profile</Link>
		</li>
		<li>
			<Link to='change-password'>Change Password</Link>
		</li>
		<li>
			<Link to='sign-out'>Sign Out</Link>
		</li>
	</>
)

const unauthenticatedOptions = (
	<>
		<li>
			<Link to='sign-up'>Sign Up</Link>
		</li>
		<li>
			<Link to='sign-in'>Sign In</Link>
		</li>
	</>
)

const alwaysOptions = (
	<>
		<li>
			<Link to=''>Home</Link>
		</li>
	</>
)

const Header = ({ user }) => (
	// <nav>
	// 	<ul>
	// 			{alwaysOptions}
	// 			{user ? authenticatedOptions : unauthenticatedOptions}
	// 	</ul>
	// </nav>
	<div>
		<Link id='wordmark' to=''><h1>YOU GET ONE</h1></Link>
		<h2>an exclusive virtual pet experience</h2>
	</div>
)

export default Header
