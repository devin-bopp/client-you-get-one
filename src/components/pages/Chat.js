import { useState, useEffect } from 'react'


export default function Chat(props) {
    // state
    const [newMessage, setNewMessage] = useState('')

    const messageChangeHandler = (e) => {
        setNewMessage(e.target.value)
    }

    const processMessageSend = (e) => {
        e.preventDefault()
        props.messageSend(newMessage, setNewMessage)
    }

    return(
        <div id='chatbox'>
            <form onSubmit={processMessageSend}>
                <input type="text" name="message" id="message" placeholder="Start a new message" onChange={messageChangeHandler} value={newMessage} />
                <input type="submit" value="Send" />
            </form>
        </div>
    )
}