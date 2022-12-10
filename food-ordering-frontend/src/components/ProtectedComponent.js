import {Error} from "../pages/Error";

export const ProtectedComponent = (props) => {
    const loggedInUser = sessionStorage.getItem('user');
    const isAuthorized = loggedInUser !== null && loggedInUser.role === props.authority;
    return loggedInUser !== null ?
        // redirect to the login page if the user is not logged in
        <Error message={"Unauthorized access! You cannot view this page, because you are not logged in!"}/>
        :
        isAuthorized ?
            // if authorized return the component
            props.component
            : // if not authorized return an error page
            <Error
                message={"Unauthorized access! You cannot view this page, because you do not have sufficient" +
                    " access rights."}/>
}