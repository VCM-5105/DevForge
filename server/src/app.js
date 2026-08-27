import express from 'express'
import cors from 'cors'

const app= express()

// 2 methods mainly

app.get("./",(req,res) => {
    res.send("server is ready")
})