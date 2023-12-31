import React from 'react';
import Regestration from './Regestration/Regestration';
import Login from './Login/Login';
import useSetlogin from '../../components/Shared/Hooks/useSetlogin';
import useAuthContext from '../../components/Shared/Hooks/useAuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { saveUser } from '../../API/auth';

const UserLogin = () => {
    const setLoginFun = useSetlogin();
    const { login, setLogin } = setLoginFun;

    const authIformation = useAuthContext();
    const {
        user,
        loading,
        setLoading,
        createUser,
        signIn,
        signInWithGoogle,
        resetPassword,
        logOut,
        updateUserProfile,
    } = authIformation;

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/"
    console.log(location);

    // google singin button 
    const handleSingIn = () => {
        signInWithGoogle().then((res) => {
            saveUser(res.user)
            navigate(from, {replace: true})
        }).catch(err => {
            setLoading(false);
            toast.error(err.message);
        })
    }
    return (
        <div>
            {
                login ?
                    <Login
                        loading={loading}
                        setLoading={setLoading}
                        signIn={signIn}
                        resetPassword={resetPassword}
                        handleSingIn={handleSingIn}
                        from={from}
                        setLogin={setLogin} />
                    :
                    <Regestration
                        loading={loading}
                        setLoading={setLoading}
                        createUser={createUser}
                        updateUserProfile={updateUserProfile}
                        handleSingIn={handleSingIn}
                        from={from}
                        setLogin={setLogin} />
            }
        </div>
    );
};

export default UserLogin;