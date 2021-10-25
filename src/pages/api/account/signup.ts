import { hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import cookie from "cookie"
import dbConnect from "../../../dbConnect";

const secret = '0e900be1-0ac5-4e6a-bf4b-38f8b21a189b';
const User = require('../../../models/User');
dbConnect();

export default async function SignUp(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method === 'POST') {
        hash(req.body.password, 10, async function(err, hash) {
            await User.create({ email: req.body.email, password: hash})

            let person = await User.create({ email: req.body.email, password: hash})

            // res.status(201).json({message: 'User created!' , data: person});

            const claims = { sub: person.id, myPersonEmail: person.email };
            const jwt = sign(claims, secret, { expiresIn: '1h' });

            res.setHeader('Set-Cookie', cookie.serialize('auth', jwt, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                sameSite: 'strict',
                maxAge: 3600,
                path: '/'
            }))

            res.json({message: 'Welcome back to the app!'});

        });
    } else {
        res.status(405).json({ message: 'We only support POST' });
    }
}