const path = require ('path')
const express = require ('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath= path.join(__dirname, '../templates/partials' )

hbs.registerPartials(partialsPath)

app.set('view engine','hbs')
app.set('views',viewsPath)
app.use(express.static(publicDirectoryPath))
app.get('', (req , res) => {
    res.render('index',{
        title : 'Weather',
        name: 'Alok',
        message: "This site will provide Weather Data"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help',(req,res) =>{
    res.render('help',{
        title:'Help',
        helpText:'This some helpful text',
        name: 'Alok K'
    })
})

app.get('/about',(req,res) =>{
    res.render('about',{
        title: 'About Me',
        name: 'Alok'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name:'Alok',
        message:"Page not Found"
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Alok',
        errorMessage: 'Help article not found.'
    })
})



app.listen (3000,() => {
    console.log('Server is started on port 3000.')
})
