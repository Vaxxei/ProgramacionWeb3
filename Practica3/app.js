const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();
const userRoutes = require('./rutas/users');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use('/', userRoutes);

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
