const express = require('express');
const cors = require('cors');
const path = require('path'); 

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

app.use(express.static(path.join(__dirname ,'/client/build')));
 app.get('*', (req, res) => {
     res.sendFile(path.join(__dirname + '/client/build/index.html'))
 });

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`)
});