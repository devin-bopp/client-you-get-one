import Chat from "./Chat"

export default function Queue(props) {

    return(
        // queue counter will go up here
        // <QueueDisplay />

        // chat goes here
        <Chat messageSend={props.messageSend} profile={props.profile} />

    )
}