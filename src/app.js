/* eslint-disable react/wrap-multilines */
/* eslint-disable react/require-extension */
/* eslint-disable react/jsx-sort-prop-types */
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const foreCast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000 ;

console.log(__dirname);
console.log(path.join(__dirname, '../public'));

//Define paths for Express config
const viewsPath = path.join(__dirname, '../templates/views');
const publicDirectory = path.join(__dirname, '../public');
const partialsPath = path.join(__dirname, '../templates/partials');


//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectory));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Nathaniel'

    });
});  // already have index.html automatically

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Nathaniel Babalola'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        sampleMessage : 'Learn more about how you can control who can see the things you share.',
        title: 'Help',
        name: 'Nathaniel Babalola'
    });
});


app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide an address'
        });
    } else {
        geoCode(req.query.address, (error, data) => {
            if (error) {
                return res.send({error});
            }

            //please note that as i'm passing data twice into the foreCast() function, 
            //it has been destructured in the function declaration, in place of latitude and longitude
            foreCast(data, data, (error, forecastData) => {
                if (error) {
                    return res.send({error});
                }

                res.send({
                    forecast: forecastData,
                    location: data.location,
                    address: req.query.address
                });
            });
        });
    }
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
       return res.send({
            error: 'You must provide a search term'
        });
    }
    console.log(req.query);
    res.send({
        products: []
    });
});


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        route: 'Help article',
        name: 'Nathaniel Babalola'
    });
    /* res.send('Help article not found'); */
});

app.get('*', (req, res) => {
    res.render('404', {
        title : '404',
        route: 'Page',
        name: 'Nathaniel Babalola'
    });
    /* res.send('Sorry This Page does not exist'); */
});

app.listen(port, () => {
    console.log(`Server has started on port ${port}`);
});
