const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');

const app = express();



mongoose.connect('mongodb://localhost:27017/cocktailweb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

app.use(express.json());
app.use('/auth', authRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
