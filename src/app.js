const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('../src/utils/geocode');
const forecast = require('../src/utils/forecast');

const app = express();

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views' , viewsPath)
hbs.registerPartials(partialsPath)

// Setup static server to serve
app.use(express.static(publicDirPath))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ritwik'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ritwik'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Type the location to get weather. Click the search button to see the results.',
        title: 'Help',
        name: 'Ritwik'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: "You must provide an address"
        })
    }

    geocode(req.query.search , (error , {latitude , longitude , location} = {} ) =>{
        if(error){
            return res.send({
                error: error
            })           
        }
    
        forecast(latitude , longitude , (error, forecastData) => {
            if(error){
                return res.send({
                    error: error
                })
            }
            
            res.send({
                location,
                forecast: forecastData,
                address: req.query.search
            })
    
        })
    })
})

app.get('/products' , (req , res)=>{
    if(!req.query.search){
        return res.send({
            error: "You must provide a search term"
        })
    }
    console.log(req.query.search); 
    res.send({
        products: []
    })
})

app.get('/help/*' , (req , res) =>{
    res.render('error' , {
        title: '404 Error',
        name: 'Ritwik',
        msg: 'Help page not found'
    })
})

app.get('*' , (req , res) =>{
    res.render('error' , {
        title: '404 Error',
        name: 'Ritwik',
        msg: 'Page not found'
    });
})

app.listen(3000, () => {
    console.log("Server is up on port 3000");
})