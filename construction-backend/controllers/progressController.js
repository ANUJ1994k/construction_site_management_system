const Progress = require("../models/Progress");

exports.createProgress = async (req, res) => {
  try {
    const progress = new Progress(req.body);
    await progress.save();
    res.status(201).json(progress);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllProgress = async (req, res) => {
  try {
    const logs = await Progress.find().populate("task", "title");
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProgressByTask = async (req, res) => {
  try {
    const logs = await Progress.find({ task: req.params.taskId }).sort({ date: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProgress = async (req, res) => {
  try {
    const log = await Progress.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!log) return res.status(404).json({ error: "Log not found" });
    res.json(log);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProgress = async (req, res) => {
  try {
    const log = await Progress.findByIdAndDelete(req.params.id);
    if (!log) return res.status(404).json({ error: "Log not found" });
    res.json({ message: "Progress entry deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
