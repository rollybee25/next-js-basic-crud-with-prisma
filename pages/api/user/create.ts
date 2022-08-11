import { prisma } from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from "next";
import { hashPassword } from '../../../lib/Helper';

export default async function handler( req: NextApiRequest, res: NextApiResponse ) {
    let { email, password, firstName, lastName } = req.body
    password = await hashPassword(password).then(value => {return value})

    try {
        await prisma.users.create({
            data: {
                email,
                password,
                firstName,
                lastName
            }
        })
        res.status(200).json({message: 'User Created'})
    }  catch (error) {
        res.status(500).json({message: error})
        console.log(error);
    }
}