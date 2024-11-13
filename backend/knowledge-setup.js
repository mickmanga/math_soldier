const mongoose = require('mongoose');
const { KnowledgeDataContainer, KnowledgeDataChapter } = require('./models/map.js');
const {Challenge, ChallengeDataBlock} = require("./models/challenge.js");

mongoose.connect('mongodb://localhost:27017/memory_soldier', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB');

    // Create an instance of KnowledgeDataContainer
    const knowledgeDataContainer = new KnowledgeDataContainer({
      knowledgeType: "Data",
      name: "Container1",
      data: "<h1>Welcome</h1>",
    });

    const secondKnowledgeDataContainer = new KnowledgeDataContainer({
      knowledgeType: "Data",
      name: "Container2",
      data: "<h1>Welcome man</h1>",
    });

    // Save the KnowledgeDataContainer instance
    const savedContainer = await knowledgeDataContainer.save();

    const secondSavedContainer = await secondKnowledgeDataContainer.save();

    // Create an instance of KnowledgeDataChapter, referencing the KnowledgeDataContainer instance by its ID
    const knowledgeDataChapter = new KnowledgeDataChapter({
      name: "chapter1",
      knowledgeType: "Chapter",
      chaptersOrData: [savedContainer._id, secondSavedContainer._id],  // Reference the KnowledgeDataContainer ID here,
      unlocked: false
    });

    // Save the KnowledgeDataChapter instance
    const savedChapter = await knowledgeDataChapter.save();
    console.log('KnowledgeDataChapter created:', savedChapter);

    
  const challengeDataBlock1 = new ChallengeDataBlock(
    {
      validated: false,
      data: savedContainer._id
    }
  );

  await challengeDataBlock1.save();

  
  const challengeDataBlock2 = new ChallengeDataBlock(
    {
      validated: false,
      data: secondSavedContainer._id
    }
  );

  await challengeDataBlock2.save();


  const firstChallenge = new Challenge({
    challengeDataBlocks: [ challengeDataBlock1, challengeDataBlock2],
    grade: 'D',
    chapter: knowledgeDataChapter._id
  });

  await firstChallenge.save();
  
    // Close the connection
    mongoose.connection.close();
  })
  .catch(error => console.error('Error connecting to MongoDB:', error));
