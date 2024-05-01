import { useState } from "react";
import UserContext from "./UserContext";

const UserState = (props) => {
    const [userDetail, setUserDetail] = useState({
        id: 10220,
        name: "Nane Singh",
        email: 'nane@yopmail.com'
    })
    return(
        <UserContext.Provider value={{userDetail, setUserDetail}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState