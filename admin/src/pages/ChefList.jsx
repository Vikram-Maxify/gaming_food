import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllChefs, deleteChef } from "../redux/slice/chefSlice";

export default function ChefList() {
  const dispatch = useDispatch();
  const { chefs, loading } = useSelector((state) => state.chef);

  useEffect(() => {
    dispatch(getAllChefs());
  }, []);

  const handleDelete = (id) => {
    if (confirm("Delete this chef?")) {
      dispatch(deleteChef(id));
    }
  };

  return (
    <div className="mt-5">

      <h2 className="text-xl font-bold mb-3">All Chefs</h2>

      {loading && <p>Loading...</p>}

      <div className="space-y-3">
        {chefs.map((chef) => (
          <div
            key={chef._id}
            className="flex justify-between items-center border p-3 rounded"
          >
            <div>
              <p className="font-semibold">{chef.name}</p>
              <p className="text-sm text-gray-500">{chef.mobile}</p>
              <p className="text-sm">{chef.category}</p>
            </div>

            <button
              onClick={() => handleDelete(chef._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}