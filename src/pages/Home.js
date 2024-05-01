import React, { useContext } from 'react';
import UserContext from '../context/users/UserContext';

export default function Home() {
    const {userDetail, setUserDetail} = useContext(UserContext);
    return (
        <div>
            <p>{userDetail?.id} - {userDetail?.name} - {userDetail?.email}</p>
            <h3>Home Page</h3>
            <button onClick={() => setUserDetail({id:20012,name:'John Doe',email:'john@yopmail.com'})}>
                Update User Detail
            </button>
        </div>
    )
}
