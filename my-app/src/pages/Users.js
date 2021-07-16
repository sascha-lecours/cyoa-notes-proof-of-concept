import React, { useEffect, useState } from 'react';

import UsersList from '../components/UsersList';
import ErrorModal from '../components/appearance/ErrorModal';
import LoadingSpinner from '../components/appearance/LoadingSpinner';


// TODO: A page for viewing all of a user's notes, with consideration for whether it's the currently auth'd user

const Users = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [loadedUsers, setLoadedUsers] = useState();

    useEffect(()=>{
        const sendRequest = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('http://localhost:3080/api/user');
                const responseData = await response.json();

                if(!response.ok){
                    throw new Error(responseData.message);
                }

                setLoadedUsers(responseData.users);
            } catch (err) {
                setError(err.message);
            }
            setIsLoading(false);
            
        };
        sendRequest();
    }, []);

    const errorHandler = () => {
        setError(null);
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={errorHandler} />
            {isLoading && <div className="center"> <LoadingSpinner /></div>}
            {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
        </React.Fragment>
    )
};

export default Users;
