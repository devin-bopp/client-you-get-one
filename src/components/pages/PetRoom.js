import { socket } from "../../App"
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react"

export default function PetRoom(props) {
    const [bugs, setBugs] = useState([])

    const navigate = useNavigate()
    
    // boots player from /pet once their time has ended
    useEffect(() => {
        const kickPlayerListener = () => {
            props.getQueue()
            props.getProfile()
            navigate('/')
        }
        socket.on('kick current player', kickPlayerListener)
        return () => {
            socket.removeListener('kick current player', kickPlayerListener)
        }
    }, [socket])

    const feedFrog = (e) => {
        e.preventDefault()
        setBugs(prev => prev.concat([{bug: '🪰', marginTop: Math.floor(Math.random() * 200 ), marginLeft: Math.floor(Math.random() * 600 )}]))
        socket.emit('fed frog', {
            userId: props.user._id
        })
    }

    // let zIdx = 200
    const bugRender = (
        bugs.map((bug) => {
            const style = {
                marginTop: bug.marginTop + 'px',
                marginLeft: bug.marginLeft + 'px',
                // zIndex: zIdx,
                position: 'absolute'
            }
            // zIdx++
            return <div style={style}>{bug.bug}</div>
        })
    )

    return (
        <>
            <div style={{position: 'absolute', zIndex: 100}}>
                {bugRender}
            </div>
            <div style={{zIndex: 200, position: 'relative'}}>
                <img id='pet-img' src='images/pet_500.png' alt='pixel art of a smiling, green frog' />
                <p>He has been fed {bugs.length} {bugs.length === 1 ? 'time' : 'times'} during this visit.</p>
                <form onSubmit={feedFrog} >
                    <input type='submit' value='Feed Him' />
                </form>
                <p>You will be returned to the queue page when your time has expired.</p>
            </div>
        </>
    )
}