import { useState, useEffect } from "react"
import Chat from "./Chat"
import { socket } from "../../App"

export default function Queue(props) {
    const [messagesData, setMessagesData] = useState([])

    useEffect(() => {
        console.log('the use effect ')
        socket.on('broadcast', data => {
            console.log(messagesData)
            // let previousData = messagesData
            // previousData.push(data)
            // setMessagesData(previousData)
            setMessagesData(prev => prev.concat([data]))
		})
    }, [socket])


    console.log('this is messagesData in queue.js', messagesData)

    return(
        // queue counter will go up here
        // <QueueDisplay />

        // chat goes here
        <Chat 
            profile={props.profile} 
            messagesData={messagesData}
        />

    )
}