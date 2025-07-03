import React from 'react';
import useAuthContext from '../../../hooks/useAuthContext';
import UserInformaiton from '../UserInformaiton/UserInformaiton';

const UserHome = () => {
    const {user} = useAuthContext()
    return (
        <div>
            <span className='font-bold text-3xl'>Hi, welcome </span>
            {
                user?.displayName ? user.displayName : 'Back'
            }
            <div>
                <UserInformaiton></UserInformaiton>
            </div>
        </div>
    );
};

export default UserHome;