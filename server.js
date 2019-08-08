const express = require('express');
const app = express();

app.use(express.static('public'));



app.get('/',(req,res) => {
	console.log('At localhost');
	res.send('index.html')
});

app.listen(3000,() => {
	console.log('Listening to port 3000')
})