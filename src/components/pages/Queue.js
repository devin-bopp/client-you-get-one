import { useState, useEffect } from "react"
import Chat from "./Chat"
import { socket } from "../../App"
import apiUrl from "../../apiConfig"

export default function Queue(props) {
    const [messagesData, setMessagesData] = useState([])

    useEffect(() => {
        console.log('the use effect ')
        socket.on('broadcast', data => {
            console.log(messagesData)
            setMessagesData(prev => prev.concat([data]))
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
                console.log(response)
            })
            .catch(error => {console.log(error)})
    }

    console.log('this is messagesData in queue.js', messagesData)

    return(
        <>
            <form onSubmit={joinQueue}>
                <input type='submit' value='Get In Line!' />
            </form>

            <Chat 
                profile={props.profile} 
                messagesData={messagesData}
            />
        </>


    )
}