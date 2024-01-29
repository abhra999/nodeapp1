const express = require('express');
const app=express();
const path=require('path');
const rootDir=require('./util/path');
const {engine}=require('express-handlebars');
const adminRoutes=require('./routes/admin');
const shopRoutes=require('./routes/shop');
const errorController = require('./controllers/error');


app.engine('hbs', engine({
  layoutsDir:'views/layouts/',
  partialsDir:'views/paritials',
  defaultLayout:'main-layout',
  extname:'hbs'
}));
app.set('view engine', 'hbs');
app.set('views', './views');


app.use(express.static(path.join(rootDir,'public'))); 



app.use('/admin',adminRoutes);
app.use(shopRoutes);


app.use(errorController.get404);

app.listen(3000);

