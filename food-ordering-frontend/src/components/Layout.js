import Header from "./Header";
import Routers from "../routes/Router";

export const Layout = () => {
    return (
        <div>
            <Routers/>
            <Header/>
            {/*...todo*/}
        </div>
    )
}