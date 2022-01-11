export default function Message(props) {
    return(
        <>
            <p>{props.sender}</p>
            <p>{props.message}</p>
        </>
    )
}