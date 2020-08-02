import App from './app';
// import './config';
import Images from './db/models/images';
Images.findAll({attributes: ['id','src','createdAt']}).then((data)=>{
  data.forEach(({src,id,createdAt})=>{
    console.log(src,id,createdAt);
  })
})


const port = 3002;



App.listen(port, () => {
  return console.log(`server is listening on ${port}`)
})