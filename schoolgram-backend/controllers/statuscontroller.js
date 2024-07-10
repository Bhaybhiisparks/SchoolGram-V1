import Status from "../models/Status.js";


// Create a new status
export async function createStatus  (req, res) {
    try {
      const user = req.user;
      const status = new Status({
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        content: req.body.content,
        media: req.body.media || [],
        visibility: req.body.visibility || 'Public'
      });
      await status.save();
      res.status(201).json(status);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Update a status
 export async function updateStatus (req, res) {
    try {
      const status = await Status.findById(req.params.id);
      if (!status) return res.status(404).json({ message: 'Status not found' });
  
      // Ensure only the user (by their id) can update the status
      if (status.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
  
      status.content = req.body.content || status.content;
      status.media = req.body.media || status.media;
      status.visibility = req.body.visibility || status.visibility;
  
      await status.save();
      res.status(200).json(status);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };