const Promo = require("../models/promoModel");

// ✅ CREATE PROMO
exports.createPromo = async (req, res) => {
  try {
    const {
      code,
      discountType,
      discountValue,
      minOrderAmount,
      maxDiscount,
      totalUsageLimit,
      perUserLimit,
      expiresAt,
      isActive,
    } = req.body;

    // 🔴 BASIC VALIDATION
    if (!code || !discountType || !discountValue) {
      return res.status(400).json({
        message: "Code, discount type and value are required",
      });
    }

    // 🔁 CHECK DUPLICATE
    const existing = await Promo.findOne({ code: code.toUpperCase() });
    if (existing) {
      return res.status(400).json({
        message: "Promo code already exists",
      });
    }

    // ⚠️ VALIDATE TYPE
    if (!["flat", "percentage"].includes(discountType)) {
      return res.status(400).json({
        message: "Invalid discount type",
      });
    }

    // ⚠️ PERCENTAGE RULE
    if (discountType === "percentage" && discountValue > 100) {
      return res.status(400).json({
        message: "Percentage cannot exceed 100%",
      });
    }

    // 📦 CREATE PROMO
    const promo = await Promo.create({
      code: code.toUpperCase(),
      discountType,
      discountValue,
      minOrderAmount: minOrderAmount || 0,
      maxDiscount: discountType === "percentage" ? maxDiscount : undefined,
      totalUsageLimit: totalUsageLimit || 0,
      perUserLimit: perUserLimit || 1,
      expiresAt: expiresAt || null,
      isActive: isActive ?? true,
    });

    res.status(201).json({
      message: "Promo created successfully",
      promo,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ✅ GET ALL PROMOS
exports.getAllPromos = async (req, res) => {
  try {
    const promos = await Promo.find()
      .sort({ createdAt: -1 })
      .populate("usedBy.user", "name");

    res.json(promos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ❌ DELETE PROMO
exports.deletePromo = async (req, res) => {
  try {
    const promo = await Promo.findById(req.params.id);

    if (!promo) {
      return res.status(404).json({
        message: "Promo not found",
      });
    }

    await promo.deleteOne();

    res.json({
      message: "Promo deleted successfully",
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};