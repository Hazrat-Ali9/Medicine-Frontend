import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthProvider';

const useAuthContext = () => {
    const auth = useContext(AuthContext)
    return auth
};

export default useAuthContext;