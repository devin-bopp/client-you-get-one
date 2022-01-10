import { useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import apiUrl from '../../apiConfig'


export default function CreateProfile(props) {

    // states
    const [newProfile, setNewProfile] = useState({
        name: ''
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        console.log('this is e.target.value: ' + e.target.value)
        setNewProfile({...newProfile, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('handleSubmit triggered')
        let preJSONBody = {
            name: newProfile.name,
            owner: props.user._id
        }

        fetch(apiUrl + '/profile', {
            method: 'POST',
            body: JSON.stringify(preJSONBody),
            headers: { 'Content-Type': 'application/JSON', 'Authorization': 'Bearer ' + props.user.token }
        })
            .then(response => response.json())
            .then(() => {
                setNewProfile({})
            })
            .then(() => navigate('/'))
            .catch(error => { console.log(error) })

    }

    return(
        <div>
            <h1>create your profile</h1>
            <form onSubmit={handleSubmit}>
                <label for='name'>Username (6-20 characters)</label>
                <input type='text' name='name' id='name' onChange={handleChange} />
                <input type="submit" value="Submit" />
            </form>
        </div>

    )
}