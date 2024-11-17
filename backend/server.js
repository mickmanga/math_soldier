const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const chapterRoutes = require('./routes/chapters.js');
const challengesRoutes = require('./routes/challenges.js');
const userRoutes = require('./routes/user.js');
const cors = require('cors');

const knowledgeRouter = require('./routes/knowledgeRouter'); // Adjust the path

const app = express();
app.use(cors({
    origin: 'http://localhost:3001', // Specify the allowed origin
    methods: ['GET', 'POST'], // Specify allowed methods
    credentials: true, // If you're sending cookies or other credentials, set this to true
}));
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/memory_soldier', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

// Use the user routes
app.use('/api/chapters', chapterRoutes);
app.use('/api/challenges', challengesRoutes);
app.use('/api/users', userRoutes); // Add the new router
app.use('/knowledgeblocks', knowledgeRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));