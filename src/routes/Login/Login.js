import { useEffect } from 'react';
import { Login as Authenticate } from '../../api/api';

export function Login() {

    useEffect(() => {
        Authenticate()
            .then(data => {
                console.log(data);
            })
    }, [])

    return (
        <div>Login Page</div>
    )
}