export const FormMessage = (props) => {
    return (
        props.data !== null && props.data.message?.length > 0 ?
            <div className={props.data.isError? "error-text": "success-text"}>
                <h5>{props.data.message}</h5>
                <hr/>
                <p>{props.data.details}</p>
            </div>
            :
            <div/>
    )
}