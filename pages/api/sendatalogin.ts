// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name?: string;
  message?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) 
{
    console.log(
        'req', req
      )
  if (req.method === 'POST') {
    if(req.body.username.toLowerCase()==='ABC'.toLowerCase() &&req.body.password==="XYZ")
    {
        res.status(200).json({message:'Login succceed'})
    }
    else{
        res.status(200).json({message:'Fail'})
    }
  } else {
    // Handle any other HTTP method
    res.status(404).json({ message: 'API not found' })
  }

}

