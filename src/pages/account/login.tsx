import { useRef, useState } from 'react';
import {Grid} from "@material-ui/core";

export default function Login() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);
    const [message, setMessage] = useState<any>(null);
    async function handleLogin() {
        const resp = await fetch(process.env.host+'/api/account/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: emailRef.current?.value,
                password: passRef.current?.value
            })
        });
        const json = await resp.json();
        setMessage(json);
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <h1>Login form</h1>
                {message && JSON.stringify(message)}
                <input type="text" placeholder="email" ref={emailRef} />
                <input type="password" placeholder="password" ref={passRef} />
                <button onClick={handleLogin}>Login</button>
            </Grid>
        </Grid>
    );
}