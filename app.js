const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname + '/views/partials');

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(__dirname + '/views/partials');

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beers => {
      console.log(beers);
      res.render('beers', { beers });
    })
    .catch(error => {
      console.log(error);
    });
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(beerRandom => {
      console.log(beerRandom);
      let randomBeer = beerRandom[0];
      res.render('randomBeer', randomBeer);
    })
    .catch(error => {
      console.log(error);
    });
});

// app.get('/beers', (req, res) => {
//   let id = req.params.id;
//   console.dir(req.params.id)
//   punkAPI
//     .getBeer(id)
//     .then(beerSingle => {
//       console.log(beerSingle);
      
//       res.render('singleBeer', beerSingle);
      
//     })
//     .catch(error => {
//       console.log(error);
//     });
// });


app.listen(3000, () => console.log('🏃‍ on port 3000'));
