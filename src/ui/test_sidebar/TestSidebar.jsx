import { useState } from "react";
import "./sidebar.css";

// Icons
import { MdMenuOpen } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { RiQuillPenAiFill } from "react-icons/ri";

import { CiSettings } from "react-icons/ci";
import { GiSecretBook } from "react-icons/gi";

import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const menuItems = [
  { icons: <IoHomeOutline size={30} />, label: "Home", path: "/home" },
  {
    icons: <RiQuillPenAiFill size={30} />,
    label: "Create",
    path: "/createpage",
  },
  { icons: <GiSecretBook size={30} />, label: "Jurnal", path: "/jurnal" },
  { icons: <CiSettings size={30} />, label: "Setting", path: "/settings" },
];

export default function TestSidebar() {
  const [open, setOpen] = useState(true);
  const userSliceData = useSelector((state) => state.data.user.user);

  return (
    <nav className={`sidebar ${open ? "sidebar-open" : "sidebar-closed"}`}>
      {/* Header */}
      <div className="header">
        <MdMenuOpen
          size={34}
          className={`menu-icon ${!open ? "rotate" : ""}`}
          onClick={() => setOpen(!open)}
        />
      </div>

      {/* Body */}
      <ul className="menu">
        {menuItems.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className={({ isActive }) =>
              `menu-item ${isActive ? "active" : ""}`
            }
          >
            <div>{item.icons}</div>
            <p className={`menu-label ${!open ? "collapsed" : ""}`}>
              {item.label}
            </p>
            <p className={`tooltip ${open ? "hidden" : ""}`}>{item.label}</p>
          </NavLink>
        ))}
      </ul>

      {/* Footer */}
      <div className="footer">
        <FaUserCircle size={40} />
        <div className={`user-info ${!open ? "collapsed" : ""}`}>
          <p>{userSliceData.username}</p>
          <span className="email">{userSliceData.email}</span>
        </div>
      </div>
    </nav>
  );
}
