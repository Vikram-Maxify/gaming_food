import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    createBanner,
    getBanners,
    deleteBanner,
} from "../redux/slice/bannerSlice";

import { ImagePlus, Trash2 } from "lucide-react";

const BannerManager = () => {
    const dispatch = useDispatch();
    const { banners, loading } = useSelector((state) => state.banner);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [files, setFiles] = useState([]);

    useEffect(() => {
        dispatch(getBanners());
    }, [dispatch]);

    const handleSubmit = (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);

  // 🔥 IMPORTANT FIX
  Array.from(files).forEach((file) => {
    formData.append("images", file);
  });

  dispatch(createBanner(formData));

  // reset properly
  setTitle("");
  setDescription("");
  setFiles([]);
};

    return (
        <div className="bg-cardGradient border border-borderSubtle rounded-xl2 shadow-soft p-6 h-full">

            {/* HEADER */}
            <h2 className="text-lg font-semibold text-textPrimary mb-4">
                Banner Manager
            </h2>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                {/* Title */}
                <input
                    type="text"
                    placeholder="Banner Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-[#1A1A1A] border border-borderSubtle rounded-xl2 text-textPrimary outline-none focus:shadow-glow"
                />

                {/* Description */}
                <input
                    type="text"
                    placeholder="Banner Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 bg-[#1A1A1A] border border-borderSubtle rounded-xl2 text-textPrimary outline-none focus:shadow-glow"
                />

                {/* Upload */}
                <label className="flex items-center justify-center gap-2 cursor-pointer bg-[#1A1A1A] border border-borderSubtle rounded-xl2 py-3 text-textSecondary hover:shadow-glow transition">
                    <ImagePlus size={16} />
                    <span className="text-sm">Upload Banner Images</span>

                    <input
  type="file"
  multiple
  onChange={(e) => setFiles(Array.from(e.target.files))} // ✅ FIX
  className="hidden"
/>
                </label>

                {/* Button */}
                <button
                    type="submit"
                    className="w-full bg-primaryGradient text-white py-2.5 rounded-xl2 shadow-glow hover:shadow-glowHover transition font-medium"
                >
                    {loading ? "Uploading..." : "Add Banner"}
                </button>
            </form>

            {/* LIST */}
            <div className="mt-6 space-y-3 max-h-[300px] overflow-y-auto pr-1">

                {banners?.length === 0 && (
                    <p className="text-textSecondary text-sm">
                        No banners added yet
                    </p>
                )}

                {banners?.map((b) => (
                    <div
                        key={b._id}
                        className="bg-[#1A1A1A] border border-borderSubtle rounded-xl2 p-3 flex justify-between items-center hover:shadow-glow transition"
                    >
                        <div>
                            <p className="font-medium text-textPrimary">
                                {b.title}
                            </p>
                            <p className="text-xs text-textSecondary">
                                {b.description}
                            </p>
                        </div>

                        <button
                            onClick={() => dispatch(deleteBanner(b._id))}
                            className="text-red-400 hover:text-red-500 transition"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BannerManager;