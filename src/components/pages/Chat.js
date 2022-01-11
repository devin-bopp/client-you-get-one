import { useState, useEffect } from 'react'


export default function Chat(props) {
    // state
    const [newPayload, setNewPayload] = useState({
        message: '',
        sender: props.profile.name
    })

    const messageChangeHandler = (e) => {
        setNewPayload({... newPayload, [e.target.name]: e.target.value})
    }

    const processMessageSend = (e) => {
        e.preventDefault()
        props.messageSend(newPayload, setNewPayload)
        setNewPayload({
            message: '',
            sender: props.profile.name
        })
    }

    return(
        <div id='chatbox'>
            <form onSubmit={processMessageSend}>
                <input 
                    type="text" 
                    name="message" 
                    id="message" 
                    placeholder="Start a new message" 
                    onChange={messageChangeHandler} 
                    value={newPayload.message}
                    autoComplete='off'
                />
                <input type="submit" value="Send" />
            </form>
        </div>
    )
}