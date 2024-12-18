const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/memory_soldier';
const { Map, Form } = require('./models/map');

async function setupDB() {
  try {
    // Connexion à MongoDB
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Vérifier les modèles enregistrés
    console.log("Registered models:", mongoose.modelNames());

    // Création d'un document "Form"
    const form = await new Form({
      elementType: "form",
      questions: [
        {
          value: "combien fait 1+1",
          answer: "2",
          done: false
        }
      ]
    }).save();

    console.log("Form saved:", form);

    // Création d'un document "Map" avec des références mixtes
    const map = await new Map({
      background: "background.png",
      elements: [
        { type: 'Form', ref: form._id } // Vérifiez que "type" correspond bien au modèle "Form"
      ]
    }).save();

    console.log('Map saved:', map);
    
  } catch (e) {
    console.error(e);
  } finally {
    mongoose.connection.close();
  }
}

setupDB();
