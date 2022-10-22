import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export default async (req, res)=>{    
    try {
        const result = await prisma.onLine.findMany()
        res.status(200).json(result)
      } catch (err) {
        console.log(err)
        res.status(403).json({ err: 'Error occured while retrieving.' })
      }    
}