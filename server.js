const config = require('./config')
const apiKey = config.WEATHER_API_KEY

const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const app = express()

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

const port = 3000

app.get('/', (req, res) => {
    // res.send('<h3>Hello World!</h3>')
    res.render('index')
})

app.post('/', (req, res) => {
    let city = req.body.city
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            let weather = data
            if(weather.main == undefined) {
                res.render('index', {weather: null, error: 'Error, please try again'})
            } else {
                let weather = data
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}`
                res.render('index', {weather: weatherText, error: null})
            }
        })
    
    // res.send('<h3>Hello World!</h3>')
    // res.render('index')
    // console.log(req.body)
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})