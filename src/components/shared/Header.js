import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const authenticatedOptions = (
	<>
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
	<nav>
		<ul>
				{alwaysOptions}
				{user ? authenticatedOptions : unauthenticatedOptions}
		</ul>
	</nav>
)

export default Header
