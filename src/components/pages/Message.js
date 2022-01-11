export default function Message(props) {
    let name
    if (props.isSelf) {
        name = <span><i>{props.sender}</i></span>
    } else {
        name = <span>{props.sender}</span>
    }
    return(
        <div key={props.key}>
            <p>{name}: {props.message}</p>
        </div>
    )
}