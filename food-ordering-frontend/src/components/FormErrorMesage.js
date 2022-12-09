export const FormErrorMessage = (props) => {
    return (
        props.error !== null && props.error.message.length > 0 ?
            <div className={"error-text"}>
                <h5>{props.error.message}</h5>
                <hr/>
                <p>{props.error.details}</p>
            </div>
            :
            <div/>
    )
}