import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import menu from "../config/menu";
import icons from "../config/icons";
import Icon from "./Icon";

export default function Sidebar() {
  const navigate = useNavigate();
  const [closed, setClosed] = useState({});

  const toggle = (title) => setClosed((c) => ({ ...c, [title]: !c[title] }));

  const logout = () => {
    navigate("/");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          {icons.logo ? <Icon name="logo" size={20} /> : "P"}
        </div>
        <div>
          <div className="project-name">PRIM LINK</div>
          <div className="project-sub">Espace client</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menu.map((group) => {
          const isClosed = !!closed[group.title];
          return (
            <div className="group" key={group.title}>
              <button
                type="button"
                className="group-title"
                onClick={() => toggle(group.title)}
                aria-expanded={!isClosed}
              >
                <Icon name={group.icon} />
                <span className="group-label">{group.title}</span>
                {icons.chevron ? (
                  <Icon name="chevron" size={14} className={isClosed ? "" : "rotated"} />
                ) : (
                  <span className={`chevron ${isClosed ? "" : "open"}`} />
                )}
              </button>

              {!isClosed && (
                <ul className="group-items">
                  {group.items.map((item) => (
                    <li key={item.path}>
                      <NavLink
                        to={item.path}
                        end={item.path === "/espace-client"}
                        className={({ isActive }) => "item" + (isActive ? " active" : "")}
                      >
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <button type="button" className="logout" onClick={logout}>
          <Icon name="deconnexion" />
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}
