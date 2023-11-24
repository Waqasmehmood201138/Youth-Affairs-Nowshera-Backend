const express = require('express');
const app  =  express();
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes= require('./routes/userRoute');
const eventRoutes= require('./routes/eventRoute');
app.listen(5000,()=>{
    console.log('Server is running on port 5000');
})
app.use(express.static('public'));
//mongoose connection
const uri = 'mongodb://bahabrlamha:test1234@ac-qma0ofj-shard-00-00.jxggzv2.mongodb.net:27017,ac-qma0ofj-shard-00-01.jxggzv2.mongodb.net:27017,ac-qma0ofj-shard-00-02.jxggzv2.mongodb.net:27017/?ssl=true&replicaSet=atlas-wk4hzs-shard-0&authSource=admin&retryWrites=true&w=majority'
mongoose.connect(uri);
const connection = mongoose.connection;

   connection
	.once('open', () => {
		console.log('mongoDB database connection established');
	})
	.on('error', (err) => {
		console.log('Error: ', err.message);
	});
    
    app.use(cors())
    app.use(express.json());
    app.use('/api/user',userRoutes)
    app.use('/events',eventRoutes)

