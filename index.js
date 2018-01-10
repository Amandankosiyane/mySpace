var path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const SpaceRoutes = require('./app');
const flash = require('express-flash');
const session = require('express-session');
const Models = require('./models');
const models = Models(process.env.MONGO_DB_URL || 'mongodb://localhost/mySpace');
const  spaceRoutes = SpaceRoutes(models);
const app = express();

app.engine('.handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 * 30 }}));
app.use(flash());

app.use(express.static(path.join(__dirname,'/public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req,res){
        res.redirect('/space')
})

app.get('/space', spaceRoutes.landing);
app.post('/space', spaceRoutes.register);



const port = process.env.PORT || 3650;
app.listen(port, function(){
        console.log('web app started on port : ' + port);
});
