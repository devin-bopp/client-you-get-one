import Chat from "./Chat"
import { socket } from "../../App"

export default function Queue(props) {

    return(
        // queue counter will go up here
        // <QueueDisplay />

        // chat goes here
        <Chat 
            profile={props.profile} 
        />

    )
}