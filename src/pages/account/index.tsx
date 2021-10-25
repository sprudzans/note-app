import {List, ListItem, ListItemText, Grid} from "@material-ui/core";
import { verify } from 'jsonwebtoken';
const secret = '0e900be1-0ac5-4e6a-bf4b-38f8b21a189b';
import cookie from "cookie"

export default function Account ({user}){
    return (
        <Grid container>
            <Grid item xs={12}>
            Привет {user.email}, давай сделаем что-то интересное!
            </Grid>
        </Grid>
    );
}

export async function getServerSideProps(ctx) {
    let cookies = ctx.req.headers.cookie ? cookie.parse(ctx.req.headers.cookie) : null;
    let user = {
        email: ''
    };

    if(cookies){
        verify(cookies.auth, secret, async function(err, decoded) {
            if (!err && decoded) {
                user.email = decoded.myPersonEmail;
            }
        });
    } else user.email = cookies;

    // const res = await fetch(process.env.host+'/api/account', {
    //     method: "POST",
    //     headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined
    // })
    //
    // const user = await res.json()

    return {
        props: {
            user,
        },
    }
}