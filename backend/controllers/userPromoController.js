const Promo = require("../models/promoModel");

// ✅ Apply promo
exports.applyPromo = async (req, res) => {
  try {
    const { code, orderAmount } = req.body;

    const promo = await Promo.findOne({ code: code.toUpperCase() });

    if (!promo || !promo.isActive) {
      return res.status(400).json({ message: "Invalid promo code" });
    }

    // ❌ Expired
    if (promo.expiresAt && promo.expiresAt < new Date()) {
      return res.status(400).json({ message: "Promo expired" });
    }

    // ❌ Min order
    if (orderAmount < promo.minOrderAmount) {
      return res.status(400).json({
        message: `Minimum order ${promo.minOrderAmount}`,
      });
    }

    // ❌ Total limit
    if (
      promo.totalUsageLimit &&
      promo.usedCount >= promo.totalUsageLimit
    ) {
      return res.status(400).json({ message: "Promo usage limit reached" });
    }

    // ❌ Per user limit
    const userUsage = promo.usedBy.find(
      (u) => u.user.toString() === req.user._id.toString()
    );

    if (userUsage && userUsage.count >= promo.perUserLimit) {
      return res.status(400).json({ message: "You already used this promo" });
    }

    // ✅ Calculate discount
    let discount = 0;

    if (promo.discountType === "flat") {
      discount = promo.discountValue;
    } else {
      discount = (orderAmount * promo.discountValue) / 100;

      if (promo.maxDiscount) {
        discount = Math.min(discount, promo.maxDiscount);
      }
    }

    res.json({
      message: "Promo applied",
      discount,
      finalAmount: orderAmount - discount,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};