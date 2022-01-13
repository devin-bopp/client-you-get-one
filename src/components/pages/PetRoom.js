import { socket } from "../../App"
import { useNavigate } from 'react-router-dom'
import { useEffect } from "react"

export default function PetRoom(props) {
    const navigate = useNavigate()
    
    // boots player from /pet once their time has ended
    useEffect(() => {
        socket.on('kick current player', () => {
            console.log('your time with the pet has ended!')
            navigate('/queue')
        })
    }, [socket])

    return (
        <div>
            <img id='pet-img' src='images/pet_500.png' alt='pixel art of a smiling, green frog' />
        </div>
    )
}