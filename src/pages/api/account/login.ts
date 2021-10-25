import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import cookie from "cookie"
import dbConnect from "../../../dbConnect";

const secret = '0e900be1-0ac5-4e6a-bf4b-38f8b21a189b';
const User = require('../../../models/User');
dbConnect();

export default async function Login(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const person = await User.findOne({email: req.body.email});
        if(!person) res.json({ message: 'User undefinded' });
        compare(req.body.password, person.password, function(err, result) {
            if (!err && result) {
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
            } else {
                res.json({ message: 'Ups, something went wrong!' });
            }
        });
    } else {
        res.status(405).json({ message: 'We only support POST' });
    }
}