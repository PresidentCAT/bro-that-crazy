require('dotenv').config()
const express = require('express')
const multer = require('multer')
const cors = require('cors')
const app =express()
const port = process.env.PORT || 5000

app.use((req, res, next)=>{
    res.on('finish',()=>{
        console.log(req.method+''+res.statusCode+''+req.originalUrl)
    })
    next()
})

app.use(cors({exposedHeaders:['Content-Disposition']}))
app.use(express.json({ limit: '1mb' }))
// app.use(express.json)({ limit:'1mb'})

app.listen(port, () => {
    console.log(`server started at port ${port}`)
})
