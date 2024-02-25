const express = require('express');
const app = express();
const path = require('path');
const rootDir = require('./util/path');
const { engine } = require('express-handlebars');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');


app.engine('hbs', engine({
  layoutsDir: 'views/layouts/',
  partialsDir: 'views/paritials',
  defaultLayout: 'main-layout',
  extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.set('views', './views');


app.use(express.static(path.join(rootDir, 'public')));

app.use((req,res,next) => {
  User
  .findById('65dab8d590ababd2b68868b7')
  .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id);

      next();
  })
  .catch(err => {
    console.log(err);
  })
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


mongoConnect(() => {
  app.listen(3000);
})