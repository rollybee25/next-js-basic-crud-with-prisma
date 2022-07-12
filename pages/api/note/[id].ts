import { prisma } from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler( req: NextApiRequest, res: NextApiResponse ) {
    const noteId = req.query.id

    if(req.method === 'DELETE') {
        const note = await prisma.note.delete({
            where: {id: Number(noteId)}
        })
        return res.json(note)
    }

    if(req.method === 'PUT') {
        const { title, content } = req.body

        const note = await prisma.note.update({
            where: {id: Number(noteId)},
            data: {
                title,
                content,
            }
        })
        return res.json(note)
    }
    console.log("Note could not be created")
    
}