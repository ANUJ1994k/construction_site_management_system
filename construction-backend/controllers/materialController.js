const Material = require("../models/Material");

// Add a new material entry
exports.createMaterial = async (req, res) => {
  try {
    const material = new Material(req.body);
    await material.save();
    res.status(201).json(material);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all material entries
exports.getAllMaterials = async (req, res) => {
  try {
    const materials = await Material.find().populate("site", "name");
    res.json(materials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get one material entry
exports.getMaterialById = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id).populate("site");
    if (!material) return res.status(404).json({ error: "Material not found" });
    res.json(material);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update material entry
exports.updateMaterial = async (req, res) => {
  try {
    const material = await Material.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!material) return res.status(404).json({ error: "Material not found" });
    res.json(material);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete material entry
exports.deleteMaterial = async (req, res) => {
  try {
    const material = await Material.findByIdAndDelete(req.params.id);
    if (!material) return res.status(404).json({ error: "Material not found" });
    res.json({ message: "Material deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
