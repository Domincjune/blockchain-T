A simple blockchain built on node js

Install dependencies: ```npm install```

Run the application: ```npm server.js```

Opening ```localhost:4000/mine_block``` should serverr the genesis block: 

for ex:
```
{
    "message": "Here is the First Block.",
    "index": 2,
    "timestamp": "1614804948038",
    "data": 0.40872398482771,
    "proof": 33758,
    "previous_hash": "1c2606d00f799a515165f96e35614c927ff12de6d56f913497b05da25017d2cd"
}
```
