import {NextApiRequest, NextApiResponse} from "next";
import { verify } from 'jsonwebtoken';
import dbConnect from "../../../dbConnect";
import cookie from "cookie"

const secret = '0e900be1-0ac5-4e6a-bf4b-38f8b21a189b';
const User = require('../../../models/User');
dbConnect();

export default async function Account(req: NextApiRequest, res: NextApiResponse) {
    verify(req.cookies.auth, secret, async function(err, decoded) {
        if (!err && decoded) {
            console.log(decoded.myPersonEmail);
            const person = await User.findById(decoded.sub);
            res.json(person);
        } else res.json({ data:  'error'});
    });
}

