import { json } from 'express'
import * as Sentry from '@sentry/nextjs'
import axios from 'axios'

export default function handler(req, res) {
  if (req.method === 'POST') {
    // Middleware to parse JSON request body
    json()(req, res, async () => {
      //   const { name, email } = req.body // Access the request body
      console.log({ req: req.body })
      const order_url = req.body.api_url

      const order = await axios.get(order_url, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_EVENTBRITE_OAUTH}`,
        },
      })

      console.log({ order })
      Sentry.captureMessage(
        `Order Placed by ${order.data.first_name} ${
          order.data.last_name
        } with email ${order.data.email} at ${new Date(order.data.created)}.`,
        {
          tags: {
            body: req.body,
            order: order.data,
          },
        },
      )

      // Perform actions (e.g., create a user) here
      res.status(200).json({ message: 'User created successfully' })
    })
  } else {
    res.status(405).end() // Method Not Allowed
  }
}
