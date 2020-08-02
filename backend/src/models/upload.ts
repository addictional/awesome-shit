import 'multer';
const FormData = require('form-data');
var http = require("http");


export async function addImage(file : Express.Multer.File) : Promise<number>{
    let form = new FormData();
    form.append('file',file);

    return 1;
}