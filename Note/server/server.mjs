import express from 'express'
import http from 'http'
import {ApolloServer} from '@apollo/server'
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer'
import {expressMiddleware} from '@apollo/server/express4'
import cors from 'cors'
import bodyParser from "body-parser"
import mongoose from "mongoose";
import 'dotenv/config'
import {resolvers} from "./resolvers/index.js";
import {typeDefs} from "./schemas/index.js";
import './firebaseConfig.js'
import {getAuth} from 'firebase-admin/auth'
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

const app = express()
const httpServer = http.createServer(app)




const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.vau8udi.mongodb.net/?retryWrites=true&w=majority`
const port = process.env.PORT || 4000

const schema = makeExecutableSchema({ typeDefs, resolvers });

const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/',
});
const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({
  // typeDefs,
  // resolvers,
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({httpServer}),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },]
})

await server.start()

const authorizationJWT = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization

  if(authorizationHeader) {
    const accessToken = authorizationHeader.split(' ')[1]
    getAuth().verifyIdToken(accessToken)
      .then(decodedToken => {
        res.locals.uid = decodedToken.uid
        next()
      }).catch(err => {
        console.log({err})
        return res.status(403).json({message: 'Forbidden', error: err})
    })
  } else {
    next()
    // return res.status(401).json({message: "Unauthorized"})
  }

};

app.use(cors(), authorizationJWT, bodyParser.json(), expressMiddleware(server, {
  context: async ({req, res}) => {
    return {
      uid: res.locals.uid
    }
  }
}))

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  console.log("connected")
  await new Promise((resolve => httpServer.listen({port: port}, resolve)))
  console.log('Ready')
})


