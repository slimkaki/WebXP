const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/public'));
app.use('/build/', express.static(path.join(__dirname, 'node_modules/three/build')));
app.use('/jsm/', express.static(path.join(__dirname, 'node_modules/three/examples/jsm')));
app.use('/fonts/', express.static(path.join(__dirname, 'node_modules/three/examples/fonts')));
app.use('/gsap/', express.static(path.join(__dirname, 'node_modules/gsap/src')));

app.listen(3000, () => console.log('Visit http://127.0.0.1:3000'));