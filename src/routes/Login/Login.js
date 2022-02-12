import { useEffect } from 'react';
import UWAPI from '../../api/api';

export function Login() {

    useEffect(() => {
        UWAPI.Login()
            .then(data => {
                console.log(data);
            })
    }, [])

    return (
        <div>Login Page</div>
    )
}