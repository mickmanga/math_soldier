const mongoose = require("mongoose");

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/memory_soldier')
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));
