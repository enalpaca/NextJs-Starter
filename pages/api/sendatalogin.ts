// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name?: string;
  message?: string;
  currentUser?: {
    username?: string;
    password?: string;

  }

};

type CurrentUser = {
  username?: string;
  password?: string;
};

const USERS = [{
  username: "DEF",
  password: "XYZ1",
  firstname: "Ellyah",
  lastname: "Nguyen",
  numberphone: "0385100218"
}, {
  username: "QWER",
  password: "ZXZC",
  firstname: "BUOI",
  lastname: "Pham",
  numberphone: "0385100219"
}, {
  username: "IPI",
  password: "GHJ",
  firstname: "CHUOI",
  lastname: "LE",
  numberphone: "0385100220"
}]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let currentUser = null; //bien co the thay doi gia tri
  console.log(
    'req', req
  )
  if (req.method === 'POST') {
    USERS.forEach(element => {
      if (req.body.username.toLowerCase() === element.username.toLowerCase() && req.body.password === element.password) {
        currentUser = element as CurrentUser;//as nametype = ep kieu
      }
    });

    // if (null) {
    //   console.log('true')
    // } else {
    //   console.log('false')
    // }

    if (currentUser) {
      delete currentUser.password; //xoa mot key trong object 
      res.status(200).json({
        message: 'Login succceed',
        currentUser
      })
    }
    else {
      res.status(200).json({ message: 'Fail' })
    }
  } else {
    // Handle any other HTTP method
    res.status(404).json({ message: 'API not found' })
  }

}
