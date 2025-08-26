const ServiceRequest = require('../model/ServiceRequest');

// Create a new service request
exports.createServiceRequest = async (req, res) => {
  try {
    const { title, description, type, location, postedBy } = req.body;

    const newServiceRequest = new ServiceRequest({
      title,
      description,
      type,
      location,
      postedBy,
    });

    const savedRequest = await newServiceRequest.save();
    res.status(201).json(savedRequest);
  } catch (error) {
    console.error('Error creating service request:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all service requests
exports.getServiceRequests = async (req, res) => {
  try {
    const requests = await ServiceRequest.find().populate("postedBy" ,"name");
    res.status(200).json(requests);
  } catch (error) {
    console.error('Error fetching service requests:', error);
    res.status(500).json({ message: 'Server error' });
  }
};