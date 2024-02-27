const express = require('express');
const app = express();
const path = require('path');
const rootDir = require('./util/path');
const { engine } = require('express-handlebars');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


const User = require('./models/user');


app.engine('hbs', engine({
  layoutsDir: 'views/layouts/',
  partialsDir: 'views/paritials',
  defaultLayout: 'main-layout',
  extname: 'hbs',
  runtimeOptions: {
    allowProtoPropertiesByDefault:true,
    allowedProtoMethodsByDefault:true
  }
}));
app.set('view engine', 'hbs');
app.set('views', './views');


app.use(express.static(path.join(rootDir, 'public')));

app.use((req, res, next) => {
   User.findById('65dc417bbcdae54a31db4007')
   .then((user) => {
      req.user = user;
      next();
   })
   .catch(err => {
    console.log(err);
   })
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb://localhost:27017/node_complete2')
.then((result) => {
  User.findOne()
  .then((user) => {
   if(!user) {
    const user = new User({
     name: 'abhra',
     email: 'abhra@gmail.com',
     cart: {
      items: []
     }  
    });
    user.save();
   }
  })
  app.listen(3000);
})
.catch(err => {
  console.log(err);
})