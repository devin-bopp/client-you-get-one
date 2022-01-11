import { useState, useEffect, forceUpdate } from 'react'
import Message from './Message'

import { socket } from '../../App'


export default function Chat(props) {
    // state
    const [newPayload, setNewPayload] = useState({
        message: '',
        sender: props.profile.name
    })
    const [messagesData, setMessagesData] = useState([])
    const [updateToggle, setUpdateToggle] = useState(true)


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

    // let messages

    // const buildMessages = (arr) => {
    //     messages = arr.map((data, i) => {
    //         return <Message key={i} sender={data.sender} message={data.message} />
    //     })
    //     // setUpdateToggle(prev => !prev)
    // }
    


    useEffect(() => {
        console.log('the use effect ')
        socket.on('broadcast', data => {
            console.log(messagesData)
            let previousData = messagesData
            previousData.push(data)
            // buildMessages(previousData)
            setMessagesData(previousData)
		})
    }, [socket])
    
    let messages

    setTimeout(() => {
        messages = messagesData.map((data, i) => {
            return <Message key={i} sender={data.sender} message={data.message} />
        })
    }, 2000)

    // useEffect(() => {
    //     setUpdateToggle(prev => !prev)
    // }, [messagesData])

    // useEffect(() => {
    //     let newMessageCount = messageCount + 1
    //     setMessageCount(newMessageCount)
    // }, [messages])

    // HACKY SOLUTION DO NOT USE
    // setInterval(() => {
    //     let newMessageCount = messageCount + 1
    //     setMessageCount(newMessageCount)
    // }, 1000)
    
    return(
        <div id='chatbox'>
            <div id='messages'>
                {messages}
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