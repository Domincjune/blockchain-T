/* 
 * @author Pavan Yerraboina
 * Create your first Blockchain using Nodejs
 */
'use strict';

const express = require("express");
const http = require('http');
const bodyParser = require('body-parser');

const Blockchain = require('./blockchain');
const blockchain = new Blockchain();

console.log('blockchian ******', blockchain)

class Server {

    constructor() {
        this.port = process.env.PORT || 4000;
        this.host = `localhost`;

        this.app = express();
        this.http = http.Server(this.app);
    }

    appConfig() {
        this.app.use(
            bodyParser.json()
        );
        this.app.use(require("express").static('client'));
    }

    /* Including app Routes starts*/    
    includeRoutes(app) {
        
        app.get("/mine_block", function (request, response) {
            const previousBlock = blockchain.getLastBlock();
            const proof = blockchain.proofOfWork(previousBlock.proof);
            const previousHash = blockchain.generateHash(previousBlock);
            const block = blockchain.createBlock({
                previousHash: previousHash,
                proof: proof
            });
            const jsonResponse = {
                message: 'Here is the First Block.',
                index: block.index,
                timestamp: block.timestamp,
                data: block.data,
                proof: block.proof,
                previous_hash: block.previous_hash
            }
            response.status(200).json(jsonResponse);
        });
    
        app.get("**", function (req, response) {
            response.status(200).json({
                message: '404, Not Found.'
            });
        });
    }
    
    /* Including app Routes ends*/
    appExecute() {

        this.appConfig();
        this.includeRoutes(this.app);

        this.http.listen(this.port, this.host, () => {
            console.log(`Listening on http://${this.host}:${this.port}`);
        });
    }

}

const app = new Server();
app.appExecute();