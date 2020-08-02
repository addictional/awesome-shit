import { Client } from "pg";
async function start (){
    let count = 0;
    while(count++ < 5) {
        console.log(count);
        const client = new Client(process.env['DATABASE_URL']);
        try {
            await client.connect();
            client.query(`
                CREATE TABLE files ( 
                    id serial PRIMARY KEY , 
                    src VARCHAR(128) NOT NULL, 
                    "createdAt" TIMESTAMP NOT NULL, 
                    "updatedAt" TIMESTAMP NOT NULL 
                );  `, (err, res) => {
                    if (err) throw err
                    console.log(res)
                    client.end()
            });
        } catch(e) {
            console.log(e.message);
            await new Promise(res => setTimeout(()=>res(),1000));
        }
    }
    throw new Error('ERROR');
}

start();
