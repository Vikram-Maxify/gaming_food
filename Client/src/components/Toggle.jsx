import { useState } from "react"

function ToggleSwitch() {
    const [checked, setChecked] = useState(false)

    return (
        <div className="flex justify-center items-center h-10">
            <div className="flex gap-3 mt-4 flex-wrap">
                    {["all", "veg", "nonveg"].map((type) => (
                         <div className="flex gap-3 mt-4 flex-wrap">
                    {["all", "veg", "nonveg"].map((type) => (
                       
                    ))}
                </div>
                       
                    ))}
                </div>
        </div>
    )
}

export default ToggleSwitch



 <div className="flex gap-3 mt-4 flex-wrap">
                    {["all", "veg", "nonveg"].map((type) => (
                       
                    ))}
                </div>