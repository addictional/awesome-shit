import {S3} from 'aws-sdk';
import crypto = require('crypto');
const secretAccessKey = 'fIIcVfiLyNjVSlDmL682Ez8mgy7sGZHyQ0dVj3WR';
const accessKeyId = 'AKIA37MELE5NVIWKJEA3';
export default class Storage {
    private bucketName : string;
    private readonly s3 = new S3({apiVersion: '2006-03-01',accessKeyId,secretAccessKey});

    constructor(bucketName : string) {
        this.bucketName = bucketName;
        
    }


    async addImage(buffer : Buffer ,fileName : string,mimetype : string){
        const [name,format] = fileName.split(".");
        const hash = crypto.createHash('md5').update(name+ new Date().toISOString()).digest('hex');
        const params  : S3.PutObjectRequest= {
            Bucket: this.bucketName, // pass your bucket name
            Key: hash + '.' + format, // file will be saved as testBucket/contacts.csv
            Body: buffer,
            ContentType : mimetype,
            ACL: 'public-read'
        };
        try {
            let result =  await this.s3.upload(params).promise();
            return result;
        } catch (e) {
            return e;
        }
    }

}