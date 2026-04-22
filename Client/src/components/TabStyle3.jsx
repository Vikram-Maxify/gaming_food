import { useState } from "react";
import "./tabstyle3.css"; // CSS alag rakhenge

const tabs = [
  { name: "home", icon: "home" },
  { name: "products", icon: "shopping_bag" },
  { name: "services", icon: "plumbing" },
  { name: "about", icon: "business" },
  { name: "help", icon: "help_outline" },
];

export default function TabStyle3() {
  const [active, setActive] = useState("home");

  return (
    <div className={`tabbar tab-style3 ${active}-style`}>
      <ul className="flex-center">
        {tabs.map((tab, index) => (
          <li
            key={index}
            className={`${tab.name} ${active === tab.name ? "active" : ""}`}
            onClick={() => setActive(tab.name)}
          >
            <span className="material-icons-outlined">
              {tab.icon}
            </span>
          </li>
        ))}

        {/* follow indicator */}
        <li className="follow"></li>
      </ul>
    </div>
  );
}