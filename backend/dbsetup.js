// dbsetup.js

const mongoose = require('mongoose');
const User = require('./models/user');
const Subject = require('./models/subject');
const { KnowledgeDataContainer, KnowledgeDataChapter } = require('./models/knowledge');
const { Challenge, ChallengeDataBlock, Answers } = require('./models/challenge');
const LearningSchema = require('./models/learning');
const LearnerSchema = require('./models/learner');
const MapSchema = require('./models/knowledge');

// MongoDB connection URI
const mongoURI = 'mongodb://localhost:27017/memory_soldier'; // Change if needed

async function setupDB() {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Create AnswerSet
    const myAnswerSet = new Answers({
      true: ["2024 is this year"],
      false: ["2024 is not this year"],
    });
    await myAnswerSet.save();

    // Create Calculus Challenge
    const calculusChallenge = new Challenge({
      name: "Calculus exam level A-C, Montana, 2016",
      answers: myAnswerSet._id,
      grade: "D",
      topGrade: "D",
    });
    await calculusChallenge.save();

    // Create KnowledgeData (CALCULUS_DATA)
    const calculusData = new KnowledgeDataContainer({
      data: "<h1>I am calculus data </h1>",
      challenge: calculusChallenge._id,
    });
    await calculusData.save();

    // Create Chapter (calculusChapter1)
    const calculusChapter1 = new KnowledgeDataChapter({
      name: "calculus_Chapter1",
      chaptersOrData: [calculusData._id],
      unlocked: true,
    });
    await calculusChapter1.save();

    // Create Subject (Calculus_subject)
    const calculusSubject = new Subject({
      name: "calculus",
      chaptersOrData: [calculusChapter1._id],
    });
    await calculusSubject.save();

    // Create MapLocation (ALDUR_FOREST)
    const aldurForest = {
      name: "La forêt d'Aldur",
      backgroundPath: "assets/background/forest.png",
      challenge: calculusChallenge._id,
    };

    // Create Map (StormGrad)
    const stormGrad = {
      name: "StormGrad",
      locations: [aldurForest],
    };

    // Create User (Michael)
    const michael = new User({
      name: "Michael",
      password: "pass",
      level: 1,
      subjects: [calculusSubject],
    });
    await michael.save();

    console.log('Database setup complete!');
    process.exit(0); // Exit the process
  } catch (error) {
    console.error('Error setting up the database:', error);
    process.exit(1); // Exit with an error code
  }
}

// Run the setup script
setupDB();
