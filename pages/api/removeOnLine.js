import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export default async (req, res)=>{
    const data = req.body
    try {
        const result = await prisma.onLine.delete({
          where: {
            spotifyid: data.spotifyid
          },
        })
        res.status(200).json(result)
      } catch (err) {
        console.log(err)
        res.status(403).json({ err: 'Error occured while deleting.' })
      }    
}