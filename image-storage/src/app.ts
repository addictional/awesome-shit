import {Express} from 'express';
import Storage from './Core/Storage';
import express = require('express');
import multer  = require('multer');


const MyStorage = new Storage('ivan-storage');


class App {
  public express: Express;

  constructor () {
    this.express = express();  
    this.mountRoutes();
  }

  private mountRoutes (): void {
    const router = express.Router()
    // this.express.use(express.json());       // to support JSON-encoded bodies
    // this.express.use(express.urlencoded());
    router.get('/', (req, res) => {
        console.log(req.url);
        res.writeHead(200, {'content-type': 'text/html'});
        res.end(`
        <form action="/upload" method="POST" enctype="multipart/form-data">
        Select image to upload:
            <input type="file" name="fileToUpload" id="fileToUpload">
            <input type="text"  name="shit" >
            <input type="submit" value="Upload Image" name="submit">
        </form>`);
    })
    const secondRouter = express.Router();
    const upload = multer({
      storage: multer.memoryStorage()
    });
    const singleUpload = upload.single('fileToUpload');
    secondRouter.post('/', (req, res,next) => {
        console.log('post');
        singleUpload(req,res,function(err : any ){
          const {originalname,buffer,mimetype} = req.file;
          MyStorage.addImage(buffer,originalname,mimetype);
        })
        // let data = new Buffer(''); 
        // req.on('data', function(chunk) {
        //     data = Buffer.concat([data, chunk]);
        // });
        // req.on('end', function() {
        //     console.log(data);
        //     // req.rawBody = data;
        //     // next();
        // });
    })
    this.express.use('/', router);
    this.express.use('/upload', secondRouter);
  }
}

export default new App().express