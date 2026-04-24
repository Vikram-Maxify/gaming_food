const Banner = require("../models/Banner");
const uploadToImageBB = require("../utils/uploadToImageBB");

// CREATE BANNER (with ImageBB upload)
exports.createBanner = async (req, res) => {
    try {
        const { title, description } = req.body;

        let images = [];

        // 📌 expect files from multer: req.files
        if (req.files && req.files.length > 0) {
            if (req.files.length > 6) {
                return res.status(400).json({
                    message: "Maximum 6 images allowed",
                });
            }

            // Upload all images to ImageBB
            images = await Promise.all(
                req.files.map(async (file) => {
                    const url = await uploadToImageBB(file.buffer);
                    return url;
                })
            );
        }

        const banner = await Banner.create({
            title,
            description,
            images,
            createdBy: req.user._id,
        });

        res.status(201).json(banner);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE BANNER
exports.updateBanner = async (req, res) => {
    try {
        const { title, description } = req.body;

        let updateData = { title, description };

        // 📌 If new images uploaded
        if (req.files && req.files.length > 0) {
            if (req.files.length > 6) {
                return res.status(400).json({
                    message: "Maximum 6 images allowed",
                });
            }

            const images = await Promise.all(
                req.files.map(async (file) => {
                    return await uploadToImageBB(file.buffer);
                })
            );

            updateData.images = images;
        }

        const banner = await Banner.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!banner) {
            return res.status(404).json({ message: "Banner not found" });
        }

        res.json(banner);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE BANNER
exports.deleteBanner = async (req, res) => {
    try {
        const banner = await Banner.findByIdAndDelete(req.params.id);

        if (!banner) {
            return res.status(404).json({ message: "Banner not found" });
        }

        res.json({ message: "Banner deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET ALL (ADMIN)
exports.getAllBannersAdmin = async (req, res) => {
    try {
        const banners = await Banner.find().sort({ createdAt: -1 });
        res.json(banners);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};