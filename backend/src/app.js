const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql').graphqlHTTP;
const mongoose = require('mongoose');
const isAuth= require('../middleware/is-auth.js');

const graphqlSchema = require('./schema/index');
const graphqlResolvers = require('./resolvers/index');

//initialize express server
const app = express();

app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if(req.method=='OPTIONS'){
        return res.sendStatus(200);
    }
    next();
});

app.use(isAuth);


app.use('/graphql', graphqlHttp({
  schema: graphqlSchema,
  rootValue: graphqlResolvers,
  graphiql: true
 }));
 


mongoose.connect('mongodb+srv://inesramoul:79ef1tMfODGvcnGM@cluster0.uespo.mongodb.net/reddit-app?retryWrites=true&w=majority')
.then( 
    () => {
    app.listen(4000);
    }
).catch(
    error => { 
     console.log("IT'S AN ERROR"); 
    console.log(error);
    }
)


console.log("🚀 Server ready at http://localhost:4000/graphql");

