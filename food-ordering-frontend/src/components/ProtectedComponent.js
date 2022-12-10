import {Error} from "../pages/Error";
import {getSessionItem, SESSION_KEY} from "../api/utils";

export const ProtectedComponent = (props) => {
    const loggedInUser = getSessionItem(SESSION_KEY.USER_KEY);
    const isAuthorized = loggedInUser !== null && props.authority.includes(loggedInUser["role"]);
    return loggedInUser === null ?
        <Error error={{
            message: "Unauthorized access!",
            details: "You cannot view this page, because you are not logged in!"
        }}/>
        :
        isAuthorized ?
            // if authorized return the component
            props.component
            : // if not authorized return an error page
            <Error
                error={{
                    message: "Unauthorized access!",
                    details: "You cannot view this page, because you do not have sufficient" +
                        " access rights."
                }}/>
}