const mongoose = require('mongoose');
const SubjectSchema = require('./models/subject.js'); // Import Subject schema model
const KnowledgeDataSchema = require('./models/map.js'); // Corrected KnowledgeData schema model import

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/memory_soldier', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Define the Subject and KnowledgeData models
const Subject = mongoose.model('Subject', SubjectSchema);
const KnowledgeData = mongoose.model('KnowledgeData', KnowledgeDataSchema);

async function createSubject() {
  try {
    // Create KnowledgeData entries for each chapter
    const chapters = [
      { name: "Chapter1", paths: ["image1.png", "image2.png", "image3.png"] },
      { name: "Chapter2", paths: ["image1.png", "image2.png", "image3.png"] },
      { name: "Chapter3", paths: ["image1.png", "image2.png", "image3.png"] },
      { name: "Chapter4", paths: ["image1.png", "image2.png", "image3.png"] },
      { name: "Chapter5", paths: ["image1.png", "image2.png", "image3.png"] }
    ];

    // Insert each chapter as a KnowledgeData document
    const knowledgeDataEntries = await KnowledgeData.insertMany(chapters);
    console.log("KnowledgeData entries created:", knowledgeDataEntries);

    // Define location names
    const locationNames = [
      "The Radiant Expanse of Solthar",
      "The Mourning Cliffs of Vandaril",
      "The Ashen Crags of Morvaen",
      "The Starfall Sands of Eryndor",
      "The Eldertide Shores of Rhyllan"
    ];

    // Create locations, each referencing a chapter as its dataBlock
    const locations = knowledgeDataEntries.map((entry, index) => ({
      name: locationNames[index],
      locked: false,
      dataBlocks: [entry._id] // each location has one dataBlock
    }));

    // Create the Subject with the map and locations
    const subject = new Subject({
      title: "Linear Algebra",
      map: {
        background: "your_background_image.png",
        locations: locations
      }
    });

    // Save the subject to the database
    await subject.save();
    console.log("Subject created successfully:", subject);
  } catch (error) {
    console.error("Error creating subject:", error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the setup
createSubject();