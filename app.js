const express = require('express');
const stripe = require('stripe')('sk_test_KGk6lM3QqC0RFmxQEH3MP4G000jMMlSJne');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const app = express();

//Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// Serve Static Assets updated static
app.use(express.static('public'));

//index route
app.get('/',(req,res)=>{
    res.render('index');
});



//Charge Route
app.post('/charge',(req,res) => {

    const amount = 3000;
    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
    })
    .then(customer => stripe.charges.create({
        amount,
        description: 'NodeJS Development Ebook',
        currency: 'usd',
        customer:customer.id
    }))
    .then(charge => res.render('success'));
});


const port  = process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log('Server started on PORT: ' + port);
});

