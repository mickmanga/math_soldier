const express = require("express");
const router = express.Router();
const { Map } = require("../models/map");

router.get('/', async (req, res) => {
   try {
     const maps = await Map.find({}).populate({
       path: 'elements.ref',  // Indique le chemin à peupler
       model: (doc) => doc.elements.type // Utilise le type pour déterminer le modèle à peupler
     });
 
     maps.forEach(map => {
       console.log("Map:", map);
       console.log("Elements:", map.elements); // Les données peuplées de Form et Other apparaîtront ici
     });
     res.json(maps);
   } catch (e) {
     console.log(e);
     res.status(500).send("Erreur du serveur");
   }
 });
 
module.exports = router;

