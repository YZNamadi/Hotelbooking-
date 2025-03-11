const express = require('express');
require('./config/database');
const userRouter = require('./routes/userRouter')
const categoryRouter = require('./routes/categoryRouter')
const PORT = 3000;
const app = express();

app.use(express.json());
app.use(userRouter);
app.use(categoryRouter);

app.listen(PORT, ()=>{
    console.log(`Server is listening to PORT :${PORT}`)
})

 
