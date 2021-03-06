import React, { useEffect, useState } from 'react';

import UsersList from '../components/UsersList';
import ErrorModal from '../components/appearance/ErrorModal';
import LoadingSpinner from '../components/appearance/LoadingSpinner';
import { useHttpClient } from '../util/hooks/httpHook';

// TODO: Make a page for viewing all of a user's notes, with consideration for whether it's the currently auth'd user

const Users = () => {

    const [loadedUsers, setLoadedUsers] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(()=>{
        const fetchUsers = async () => {
            try {
                const responseData = await sendRequest(
                    'http://localhost:3080/api/user' // Defaults to GET, No body or headers since it's a GET
                );
                setLoadedUsers(responseData.users);
            } catch (err) {
                // Error handled in sendRequest
            }
            
        };
        fetchUsers();
    }, [sendRequest]);

    const errorHandler = () => {
        clearError();
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
