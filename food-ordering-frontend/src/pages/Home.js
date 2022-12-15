import React from "react";
import {Header} from "../components/Header";
import {isAdmin, isLoggedIn} from "../api/utils";
import {ManagerView} from "./ManagerView";
import {CustomerView} from "./CustomerView";
import {Login} from "./Login";

export const Home = () => {
    return (
        <div>
            {
                isAdmin() ?
                    <div>
                        <Header/>
                        <ManagerView/>
                    </div>
                    :
                    isLoggedIn() ?
                        <div>
                            <Header/>
                            <CustomerView/>
                        </div>
                        :
                        <Login/>
            }
        </div>
    );
};