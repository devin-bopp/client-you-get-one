export default function Message(props) {
    let message

    if (!props.sameSender) {
        message = (
            <>
                <p className='sender'>{props.isSelf ? (<b><i>{props.sender}</i></b>) : (<b>{props.sender}</b>)} - {props.count}</p>
                <p className='message-text'>{props.message}</p>
            </>
        )
    } else {
        message = (
            <p className='message-text'>{props.message}</p>
        )
    }

    return (
        <div className='message'>
            {message}
        </div>
    )
}