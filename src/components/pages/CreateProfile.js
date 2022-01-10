export default function CreateProfile(props) {
    return(
        <div>
            <h1>create your profile</h1>
            <form onSubmit={() => {console.log('submit hit!')}}>
                <label for='name'>Username (6-20 characters)</label>
                <input type='text' name='name' id='name' />
                <input type="submit" value="Submit" />
            </form>
        </div>

    )
}