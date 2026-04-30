const ItemPreparation = require("../models/ItemPreparation");
const Product = require("../models/productModel");


// 👨‍🍳 MARK ITEM READY
exports.markItemReady = async (req, res) => {
    try {
        const { orderId, itemId, productId } = req.body;

        // 👇 assume auth middleware se aa raha hai
        const { _id: chefId, name: chefName } = req.user;

        const record = await ItemPreparation.create({
            orderId,
            itemId,
            productId,
            chefId,
            chefName,
            status: "ready",
        });

        res.status(201).json({
            success: true,
            message: "Item marked ready & tracked",
            data: record,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getdatabyid = async (req, res) => {
    try {
        const chefId = req.user._id;

        const items = await ItemPreparation.find({ chefId });

        const data = await Promise.all(
            items.map(async (item) => {
                let productDetails = null;

                if (item.productId) {
                    productDetails = await Product.findById(item.productId)
                        .select("name price image");
                }

                return {
                    ...item._doc,
                    productDetails,
                };
            })
        );

        res.json({
            success: true,
            data,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 📦 GET ALL TRACKING
exports.getAllPreparations = async (req, res) => {
    try {
        const data = await ItemPreparation.find()
            .populate("chefId", "name")
            .populate("productId", "name");

        res.json({
            success: true,
            data,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};