const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      res.render('beers', { beersFromApi });
    })
    .catch(error => console.log(error));
});

app.get('/random-beer', (req, res, next) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      res.render('random-beer', { responseFromAPI });
    })
    .catch(error => console.log(error));
});

app.get('/beers/:id', function (req, res) {
  punkAPI.getBeer(req.params.id).then(responseFromAPI => {
    res.render('beerID', { responseFromAPI });
  });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
