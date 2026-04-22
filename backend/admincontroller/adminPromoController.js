const Promo = require("../models/promoModel");

// ✅ Create promo
exports.createPromo = async (req, res) => {
  try {
    const promo = await Promo.create(req.body);

    res.status(201).json({
      message: "Promo created",
      promo,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get all promos
exports.getAllPromos = async (req, res) => {
  try {
    const promos = await Promo.find().sort({ createdAt: -1 });
    res.json(promos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Delete promo
exports.deletePromo = async (req, res) => {
  try {
    await Promo.findByIdAndDelete(req.params.id);
    res.json({ message: "Promo deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};