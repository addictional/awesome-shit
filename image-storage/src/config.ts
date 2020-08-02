import AWS from 'aws-sdk';

AWS.config.getCredentials(function(err : any) {
    if (err) console.log(err.stack);
    // credentials not loaded
    else {
        if(AWS.config.credentials) {
            console.log("Access key:", AWS.config.credentials.accessKeyId);
        }
    }
});