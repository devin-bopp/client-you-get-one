export default function Message(props) {
    let message

    if (!props.sameSender) {
        message = (
            <>
                <p className='sender'><b>{props.sender}</b></p>
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
//     let name
//     if (props.isSelf) {
//         name = <span><i><b>{props.sender}</b></i></span>
//     } else {
//         name = <span>{props.sender}</span>
//     }
//     return(
//         <div className='message' key={props.key}>
//             <p>{name}</p>
//             <p>{props.message}</p>
//         </div>
//     )
}