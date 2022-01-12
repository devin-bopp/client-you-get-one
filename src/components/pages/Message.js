export default function Message(props) {
    let name
    if (props.isSelf) {
        name = <span><i><b>{props.sender}</b></i></span>
    } else {
        name = <span>{props.sender}</span>
    }
    return(
        <div className='message' key={props.key}>
            <p>{name}: {props.message}</p>
        </div>
    )
}