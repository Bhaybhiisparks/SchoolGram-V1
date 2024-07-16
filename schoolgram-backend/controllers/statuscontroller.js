import Status from "../models/Status.js";


// Get the current status of a user
export async function getCurrentStatus(req, res) {
  try {
    const { user } = req.params;
    console.log('Request parameters:', req.params); // Debugging line


    const status = await Status.findOne({ userId: user });
    console.log('Status found:', status); // Debugging line

    if (!status) {
      console.log('Status not found for user ID:', user); // Debugging line
      return res.status(404).json({ message: 'Status not found' });
    }
    
    res.status(200).json(status);
  } catch (error) {
    console.error('Error in getCurrentStatus:', error.message);
    res.status(500).json({ error: error.message });
  }
}

// Create or update a status
export async function createOrUpdateStatus(req, res) {
  try {
    const user = req.user;
    console.log('User object:', user); // Debugging line

    if (!user || !user._id) {
      console.log('User object is missing or does not have an _id');
      return res.status(401).json({ message: 'Unauthorized' });
    }else{
    console.log('Creating or updating status for user ID:', user._id); 
    }

    let status = await Status.findOne({ userId: user._id });
    console.log('Existing status:', status);

    if (status) {
      // Update existing status
      console.log('Updating status with content:', req.body.content);
      status.content = req.body.content || status.content;
      status.media = req.body.media || status.media;
      status.visibility = req.body.visibility || status.visibility;
    } else {
      const {userId, firstName, lastName, content, media, visibility} = req.body;
      console.log('Creating new status with data:', { userId, firstName, lastName, content,})
      // Create new status
      status = new Status({
        userId,
        firstName,
        lastName,
        content,
        media: media || [],
        visibility: visibility || 'Public'
      });
    }

    await status.save();
    console.log('Status saved:', status);
    res.status(200).json(status);
  } catch (error) {
    console.error('Error in createOrUpdateStatus:', error.message); 
    res.status(500).json({ error: error.message });
  }
};
