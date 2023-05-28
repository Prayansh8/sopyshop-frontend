import React from "react";
import { Link } from "react-router-dom";
import "./MobileAdminBar.css";
import { Dashboard, Group, ViewList, ViewModule } from "@mui/icons-material";

const MobileAdminBar = () => {
  return (
    <div className="mobileTopBarContainer">
      <div className="mobileTopBarContainer1">
        <div>
          <div className="deshboardLinksContainer">
            <Link className="deshbordLinkBtn" to="/admin/dashboard">
              <div className="deshboardLinks">
                <div>
                  <Dashboard />
                </div>
                <span>Dashboard</span>
              </div>
            </Link>
            <Link className="deshbordLinkBtn" to="/admin/users">
              <div className="deshboardLinks">
                <div>
                  <Group />
                </div>
                <span> Users </span>
              </div>
            </Link>
            <Link className="deshbordLinkBtn" to="/admin/orders">
              <div className="deshboardLinks">
                <div>
                  <ViewList />
                </div>
                <span>Orders</span>
              </div>
            </Link>
            <Link className="deshbordLinkBtn" to="/admin/product">
              <div className="deshboardLinks">
                <div>
                  <ViewModule />
                </div>
                <span>Products</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileAdminBar;
