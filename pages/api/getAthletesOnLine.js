import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export default async (req, res)=>{    
    try {
        const data = req.body        
        const result = await prisma.athlete.findMany({
            where:{
                spotifyid: {
                    in: data.spotifyids
                }
            }
        })
        res.status(200).json(result)
      } catch (err) {
        console.log(err)
        res.status(403).json({ err: 'Error occured while retrieving.' })
      }    
}