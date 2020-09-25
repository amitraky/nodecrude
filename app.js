require('./models/db');

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');

const employeeController = require('./controllers/employeeController');
const welcomeController = require('./controllers/welcomeController');
const movieController = require('./controllers/movieController');
const authController = require('./controllers/authController');

var app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'portal', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');

var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

app.listen(5000, () => {
    console.log('Express server started at port : 5000');
});
app.get('/',function(request,response){
    response.redirect('welcome/welcome');
})



app.use('/employee', employeeController);
app.use('/welcome', welcomeController);
app.use('/movie', movieController);
app.use('/auth', authController);