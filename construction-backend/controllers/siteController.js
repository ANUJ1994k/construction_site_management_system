const Site = require("../models/Site");

// Create a new site
exports.createSite = async (req, res) => {
  try {
    const { name, location, startDate, endDate } = req.body;
    const site = new Site({ name, location, startDate, endDate });
    await site.save();
    res.status(201).json(site);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all sites
exports.getAllSites = async (req, res) => {
  try {
    const sites = await Site.find();
    res.json(sites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single site by ID
exports.getSiteById = async (req, res) => {
  try {
    const site = await Site.findById(req.params.id);
    if (!site) return res.status(404).json({ error: "Site not found" });
    res.json(site);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update site by ID
exports.updateSite = async (req, res) => {
  try {
    const site = await Site.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!site) return res.status(404).json({ error: "Site not found" });
    res.json(site);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete site
exports.deleteSite = async (req, res) => {
  try {
    const site = await Site.findByIdAndDelete(req.params.id);
    if (!site) return res.status(404).json({ error: "Site not found" });
    res.json({ message: "Site deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
