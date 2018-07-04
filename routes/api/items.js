const express = require('express');
const router = express.Router();

// Item Model 
const Item = require('../../config/models/Item');

// Get request to api/items
// Get all items
router.get('/', (req, res) => {
    Item.find()
      .sort({ date: -1 })
      .then(items => res.json(items))
  });

// Get POST api/items
// Create a Post
router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });
    newItem.save()
        .then(item => res.json(item));
  });

module.exports = router;