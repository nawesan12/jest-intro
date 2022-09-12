import express from "express"
import { v4 } from "uuid"

const app = express()

app.use(express.json())

app
    .get("/ping", (req, res) => {
        res.send("pong")
    })
    .get("/tasks", (req, res) => {
        res.json([]).end()
    })
    .post("/tasks", (req, res) => {
        const { title, description } = req.body

        if(!title || !description) return res.status(400).json({title, description})

        res.status(200).json({
            id: v4(),
            title,
            description
        })
    })

export default app