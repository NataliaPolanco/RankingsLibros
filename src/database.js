const mongoose= require('mongoose');
mongoose.connect('mongodb://localhost/notes-db-app',{
  useCreateIndex:true,
  useNewUrlParse: true,
  useFindAndModify: false

})
.then(db=> console.log('DB is connected'))
.catch(err=> console.error(err));