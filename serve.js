const express = require('express');
const hbs = require('hbs');
var app = express();
const fs = require('fs');
const port=process.env.PORT|| 3000;
//configuracion de expres para que use hbs como view engine

hbs.registerPartials(__dirname + '/views/partials')

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.set('view engine', 'hbs');

app.use((req, res, next) =>  {

    //next sirve expres para decir cuando termina el midle ware
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
fs.appendFile('server.log', log + '\n',(err)=>{
    if (err) {
        console.log('Unable to append to server.log.')
      }
});
    console.log(log );
    next();
});



app.get('/', (req, res) => {

    res.render('home.hbs', {

        pageTitle: 'Home Page',
        welcomeMessage: 'bienvenido a la página',
        currentYear: new Date().getFullYear()

    });

});



app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});
app.get('/ayuda', (req, res) => {
    res.sendFile('help.html');
});
app.get('/about', (req, res) => {
    //res.send('Acerca de');
    res.render('about.hbs', {
        pageTitle: 'Página acerca de',
        currentYear: new Date().getFullYear()
    });
});
app.get('/proyectos', (req, res) => {
    //res.send('Acerca de');
    res.render('proyectos.hbs', {
        proyecto: 'proyecto uno',
        pageTitle: 'Proyectos',
        currentYear: new Date().getFullYear()
    });
});
app.listen(port,()=>{
    console.log(`Server is up on port ${port}`);
});