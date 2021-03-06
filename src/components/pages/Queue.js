import { useState, useEffect } from "react"
import Chat from "./Chat"
import { socket } from "../../App"
import apiUrl from "../../apiConfig"
import { Link } from 'react-router-dom'

export default function Queue(props) {
    const [messagesData, setMessagesData] = useState([])

    // useEffect checks for changes to the socket
    useEffect(() => {
        const broadcastListener = data => setMessagesData(prev => prev.concat([data]))
        const queueUpdateListener = () => props.getQueue()
        // depending on broadcast type, a different effect is triggered
        socket.on('broadcast', broadcastListener)
        socket.on('queue update', queueUpdateListener)
        // cleanup to prevent memory leaks
        return () => {
            socket.removeListener('broadcast', broadcastListener)
            socket.removeListener('queue update', queueUpdateListener)
        }
    }, [socket])

    const joinQueue = (e) => {
        e.preventDefault()
        let preJSONBody = {
            owner: props.user._id
        }
        fetch(apiUrl + '/queue', {
            method: 'POST',
            body: JSON.stringify(preJSONBody),
            headers: { 'Content-Type': 'application/JSON', 'Authorization': 'Bearer ' + props.user.token }
        })
            .then(response => response.json())
            .then(response => {
                props.getQueue()
                socket.emit('joined queue')
            })
            .catch(error => { console.log(error) })
    }

    const leaveQueue = (e) => {
        e.preventDefault()
        let preJSONBody = {
            owner: props.user._id
        }
        fetch(apiUrl + '/queue', {
            method: 'DELETE',
            // body: JSON.stringify(preJSONBody),
            headers: { 'Authorization': 'Bearer ' + props.user.token }
        })
            .then(() => {
                console.log('this is right before set queue')
                socket.emit('left queue')
                props.getQueue()
            })
            .catch(error => { console.log(error) })
    }

    // content for the queue display
    let queueDisplay

    // index 0 means they are not in line
    // show the button
    if (props.queue === 0) {
        queueDisplay = (
            <form onSubmit={joinQueue}>
                <input type='submit' value='Get In Line!' />
            </form>
        )
    // if user is first in line, it is their turn
    // they get access to the pet button
    } else if (props.queue === 1) {
        queueDisplay = (
            <>
                <p>It's your turn!</p>
                <p><Link to='../pet'>Click here</Link> to enter.</p>
            </>
        )
    // if they are already in line this tells them how many people are ahead of them
    } else {
        queueDisplay = (
            <>
                <p>There {props.queue - 1 === 1 ? 'is' : 'are'} {props.queue - 1} {props.queue - 1 === 1 ? 'user' : 'users'} ahead of you!</p>
                <form onSubmit={leaveQueue}>
                    <input type='submit' value='Leave the Queue' />
                </form>
            </>
        )
    }

    return (
        <>
            {queueDisplay}
            <p>You can chat with your fellow users while you wait!</p>
            <Chat
                profile={props.profile}
                messagesData={messagesData}
            />
        </>
    )
}