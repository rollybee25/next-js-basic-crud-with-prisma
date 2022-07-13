import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler( req: NextApiRequest, res: NextApiResponse ) {


    const noteId = req.query.email

    if(req.method === 'GET') {
        const findUser = await prisma.users.findMany()
        return res.json({message: findUser})
    }
}