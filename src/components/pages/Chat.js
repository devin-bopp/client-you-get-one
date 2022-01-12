import { useState, useEffect, forceUpdate } from 'react'
import Message from './Message'

import { socket } from '../../App'

import ScrollToBottom from 'react-scroll-to-bottom'

export default function Chat(props) {
    // state
    const [newPayload, setNewPayload] = useState({
        message: '',
        sender: props.profile.name
    })

    const messageChangeHandler = (e) => {
        setNewPayload({... newPayload, [e.target.name]: e.target.value})
    }

    const messageSend = (e) => {
        e.preventDefault()
		if (newPayload.message) {
			socket.emit('chat message', newPayload)
			setNewPayload({
                message: '',
                sender: props.profile.name  
            })
		}
	}
        
    const messages = props.messagesData.map((data, i) => {
        return <Message
            key={i}
            sameSender={i > 0 ? data.sender === props.messagesData[i - 1].sender : false}
            sender={data.sender}
            message={data.message}
            isSelf={props.profile.name === data.sender}
        />
    })

    return(
        <div id='chatbox'>
            <div id='messages'>
            <ScrollToBottom className='messages'>
                    {messages}
            </ScrollToBottom>

            </div>
            <form onSubmit={messageSend}>
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