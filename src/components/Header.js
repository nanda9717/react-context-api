import React, { useContext } from 'react';
import UserContext from '../context/users/UserContext';

export default function Header() {
    const {userDetail} = useContext(UserContext);
    return (
        <div>
            <h2>Header - {userDetail?.name}</h2>
        </div>
    )
}
