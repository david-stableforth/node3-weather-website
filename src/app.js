const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname,'../public'))

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// to retrieve hbs view
app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather',
        name: 'David Stableforth'
    })
})
app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About me',
        name: 'David Stableforth'
    })
})
app.get('/help', (req,res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'David Stableforth'
    })
})
app.get('/weather', (req,res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error,{latitude, longitude, location} = {}) => {
        if(error){
           return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
             res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
          })
    })
})


app.get('/help/*', (req,res) => {
    res.render('error', {
        title: '404',
        name: 'David Stablerforth',
        errorText: 'Help article not found'
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})
app.get('*',(req, res) => {
    res.render('error', {
        title: '404',
        name: 'David Stablerforth',
        errorText: 'Page not found'
    })
})


app.listen(port, () =>{
    console.log('Server is up on port' + port)
})


