import { useState, useEffect } from "react"
import Chat from "./Chat"
import { socket } from "../../App"
import apiUrl from "../../apiConfig"

export default function Queue(props) {
    const [messagesData, setMessagesData] = useState([])
    const [inLine, setInLine] = useState(false)

    useEffect(() => {
        console.log('the use effect ')
        socket.on('broadcast', data => {
            console.log(messagesData)
            setMessagesData(prev => prev.concat([data]))
		})
        socket.on('queue update', () => {
            console.log('received queue update from server')
            props.getQueue()
        })
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
            })
            .catch(error => {console.log(error)})
    }

    // content for the queue display
    let queueDisplay

    if (props.queue === 0) {
        queueDisplay = (
            <form onSubmit={joinQueue}>
                <input type='submit' value='Get In Line!' />
            </form>
        )
    } else if (props.queue === 1) {
        queueDisplay = (
            <>
                <p>It's your turn!</p>
                <p>Click here to enter.</p>
            </>
        )
    } else {
        queueDisplay = (
            <p>There {props.queue - 1 === 1 ? 'is' : 'are'} {props.queue - 1} {props.queue - 1 === 1 ? 'user' : 'users'}  ahead of you!</p>
        )
    }

    if (!props.queue) {
        queueDisplay = (
            <form onSubmit={joinQueue}>
                <input type='submit' value='Get In Line!' />
            </form>
        )
    } else {
        fetch(apiUrl + '/queue/sort', {
            headers: { 'Content-Type': 'application/JSON', 'Authorization': 'Bearer ' + props.user.token }
        })
            .then(data => data.json())
            .then(fullQueue => {
                return fullQueue.map(queue => {
                    return queue.owner._id
                })
            })
            .then(fullQueueIds => {
                return fullQueueIds.indexOf(props.user._id)
            })
            .then(index => {
                console.log('this is the idnex of the item we are lookign at:', index)
                console.log('this is the new value of queue element on page', queueDisplay)
                queueDisplay = (
                    <div>
                        <p>You are number {index + 1} in line!</p>
                    </div>
                )
            })
            .catch(error => console.log(error))
    }
    

    return(
        <>
            {queueDisplay}
            <Chat 
                profile={props.profile} 
                messagesData={messagesData}
            />
        </>


    )
}