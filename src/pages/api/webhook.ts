import { json } from 'express'

export default function handler(req, res) {
  if (req.method === 'POST') {
    // Middleware to parse JSON request body
    json()(req, res, () => {
      //   const { name, email } = req.body // Access the request body
      console.log({ req: req.body })

      // Perform actions (e.g., create a user) here
      res.status(200).json({ message: 'User created successfully' })
    })
  } else {
    res.status(405).end() // Method Not Allowed
  }
}
