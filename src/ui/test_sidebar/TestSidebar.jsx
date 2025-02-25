import { useState } from "react";
import "./sidebar.css";

// Icons
import { MdMenuOpen } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { RiQuillPenAiFill } from "react-icons/ri";
import { RiLogoutBoxFill } from "react-icons/ri";

import { IoSettingsSharp } from "react-icons/io5";
import { GiSecretBook } from "react-icons/gi";

import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../features/auth/userSlice";
import { signOut } from "firebase/auth";
import { auth } from "../../features/auth/firebase";

const menuItems = [
  { icons: <FaHome size={30} />, label: "Home", path: "/home" },
  {
    icons: <RiQuillPenAiFill size={30} />,
    label: "Create",
    path: "/createpage",
  },
  { icons: <GiSecretBook size={30} />, label: "Jurnal", path: "/jurnal" },
  { icons: <IoSettingsSharp size={30} />, label: "Setting", path: "/settings" },
];

export default function TestSidebar() {
  const [open, setOpen] = useState(true);
  const userSliceData = useSelector((state) => state.data.user.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    signOut(auth);
  };

  return (
    <nav className={`sidebar ${open ? "sidebar-open" : "sidebar-closed"}`}>
      <div className="header">
        <MdMenuOpen
          size={34}
          className={`menu-icon ${!open ? "rotate" : ""}`}
          onClick={() => setOpen(!open)}
        />
      </div>

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

      <div className="footer">
        <div className="user-info-wrapper">
          <FaUserCircle
            size={40}
            className={`user-icon ${!open ? "collapsed" : ""}`}
          />
          <div className={`user-info ${!open ? "collapsed" : ""}`}>
            <p>{userSliceData.username}</p>
            <span className="email">{userSliceData.email}</span>
          </div>
        </div>
        <button
          className="btn_logout
        "
          onClick={handleLogout}
        >
          <RiLogoutBoxFill size={30} />
          <p className="tooltip">Logout</p>
        </button>
      </div>
    </nav>
  );
}
