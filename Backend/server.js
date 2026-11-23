const app = require("./src/app");
const DBconnection = require("./src/db/db");

const port = process.env.PORT || 8080

DBconnection()
.then(() => {
    console.log('Trying to connect to server.....')
    app.listen(port, () => {
        console.log(`Connected to server on port: ${port}`);
    })
})
.catch((error)=>{
    console.log(`Server connection failure: ${error.message}`)
})