import {Express} from 'express';
import  FormData from 'form-data';
import express = require('express');
import multer  = require('multer');
import http = require("http");

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
        const options : http.RequestOptions = {
          host: 'image-storage',
          port: 3002,
          path: '/',
          method: 'GET',
          headers : {
            'Content-Type' : 'multipart/form-data'
          }
        };
        const req2 = http.request(options, function(res2 : any)
        {
            res2.setEncoding('utf8');
            res2.on('data', function (chunk : any) {
                console.log("body: " + chunk);
            });
        });
        req2.end();
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
    const upload = multer({storage : multer.memoryStorage()});
    const singleUpload = upload.single('fileToUpload');
    secondRouter.post('/',upload.single('fileToUpload'), (req, res,next) => {
        singleUpload(req,res,function(err : any ){
          const form = new FormData();
          form.append('file',req.file.buffer,{
            filename: req.file.originalname,
            contentType: req.file.mimetype
          })
          const options : http.RequestOptions = {
            host: 'image-storage',
            port: 3002,
            path: '/',
            method: 'GET',
            headers : {
              'Content-Type' : 'multipart/form-data'
            }
          };
        });
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