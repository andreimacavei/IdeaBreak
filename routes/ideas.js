const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea');


// Get all ideas
router.get('/', async (req, res) => {
  try {
    const ideas = await Idea.find();
    res.json({ success: true, data: ideas });
  } catch (err) {
    console.log(error);
    res.status(500).json({ success: false, error: err.message });
  }
  
});

// Get single idea
router.get('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    res.json({ success: true, data: idea });
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, error: error.message });
  }
});

// Add an idea
router.post('/', async (req, res) => {
  const idea = new Idea({
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username,
  });

  try {
    const savedIdea = await idea.save();
    res.json({ success: true, data: savedIdea });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
  
  }
);

// Update an idea
router.put('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    // If username does not match idea username
    if (idea.username !== req.body.username) {
      return res.status(403).json({ success: false, error: 'Unauthorized' });
    }

    const updatedIdea = await Idea.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          text: req.body.text,
          tag: req.body.tag,
          username: req.body.username,
        },
      },
      {new: true}
    );

    return res.json({ success: true, data: updatedIdea });
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete an idea
router.delete('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    
    // // If username does not match idea username
    if (idea.username !== req.body.username) {
      return res.status(403).json({ success: false, error: 'Unauthorized' });
    }
    

    await Idea.findByIdAndDelete(req.params.id);
    res.json({ success: true, data: {} });
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;