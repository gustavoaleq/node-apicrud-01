require('dotenv/config')
const express = require('express')
const mongoose = require('mongoose')

const app = express()

const personRoutes = require('./routes/personRoutes')

//forma de ler JSON (middlewares)
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

//rotas da API
app.use('/person', personRoutes)

// rota inicial / endpoint
app.get('/', (req, res) => {
    res.json({message: 'Oi Express!'})
})

// conectar no banco de dados | configurar uma porta
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@api-01.onuimtt.mongodb.net/bancoapi?retryWrites=true&w=majority`,
    )
    .then(()=>{
        console.log('Conectado ao MongoDB!')
        app.listen(3000)
    }) 
    .catch((err)=>{
        console.log(err)
    })



