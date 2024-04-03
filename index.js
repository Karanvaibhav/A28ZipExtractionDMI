const express = require('express');
const port = process.env.PORT || 3000 ;
const app = express();

const zipRoute = require('./routes/zipRoute');
app.use(express.urlencoded({ extended: false }));
app.use(express.json({extended:true}));

app.use('/', zipRoute);

app.listen(port, ()=>console.log(`Server running on Port : ${port}`));
