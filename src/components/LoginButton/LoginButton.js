import React from 'react';
import { Box } from '@chakra-ui/react';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router';
import { useAuth } from '../../AuthProvider';

const clientId = '106551035992-i02vrfmr15dne7nepmqbn4k4i361j1s1.apps.googleusercontent.com';

export function LoginButton() {
    const navigate = useNavigate();
    const { signin } = useAuth();

    function onSuccess(res) {
        // console.log("login success", res.profileObj);
        signin(res.profileObj);
        navigate('/projects');

    }

    function onFailure(res) {
        // console.log("login failed", res);
    }

    return (
        <Box background={'white'} opacity={1}>
            <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </Box>
    )
}

const refreshTokenSetup = (res) => {
    let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

    const refreshToken = async() => {
        const newAuthRes = await res.reloadAuthResponse();
        refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;

        setTimeout(refreshToken, refreshTiming);
    }
    setTimeout(refreshToken, refreshTiming);
}