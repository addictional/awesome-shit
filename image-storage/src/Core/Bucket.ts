import {S3} from 'aws-sdk';


export default class Bucket {
    private readonly s3 = new S3({apiVersion: '2006-03-01'});
    static readonly REGION = "eu-central-1";
    async create(name: string) {
        try {
            await this.s3.createBucket({
                Bucket : name,
                CreateBucketConfiguration : {
                    LocationConstraint : Bucket.REGION
                }
            }).promise();
            return 200;
        } catch (error) {
            throw new Error(error.statusCode);
        }
    }

    async delete(name : string){
        try{
            await this.s3.deleteBucket({
                Bucket : name
            }).promise();
            return 200;
        } catch( error) {
            throw new Error(error.statusCode);
        }
    }
}