import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link, Outlet } from "react-router-dom";

export default function AdminLayout() {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <div>
        <Sidebar collapsed={collapsed}>
          <Menu
            renderExpandIcon={({ open }) => <span>{open ? "-" : "+"}</span>}
            menuItemStyles={{
              button: ({ level, active, disabled }) => {
                // only apply styles on first level elements of the tree
                if (level === 0)
                  return {
                    color: disabled ? "#f5d9ff" : "#fb4126",
                    backgroundColor: active ? "#eecef9" : undefined,
                  };
              },
            }}
          >
            <SubMenu label="QUẢN LÝ LỊCH ĐẶT SÂN">
              <MenuItem component={<Link to="soccerbookingmanage" />}>LỊCH ĐẶT SÂN</MenuItem>
            </SubMenu>
            <SubMenu label="QUẢN LÝ TÀI KHOẢN">
              <MenuItem component={<Link to="accountmanage" />}>TÀI KHOẢN</MenuItem>
            </SubMenu>
            <SubMenu label="QUẢN LÝ SÂN BÓNG">
              <MenuItem component={<Link to="soccerfieldmanage" />}>SÂN BÓNG</MenuItem>
            </SubMenu>
            <SubMenu label="QUẢN LÝ NHÂN VIÊN">
              <MenuItem component={<Link to="employeemanage" />}>NHÂN VIÊN</MenuItem>
            </SubMenu>
            <SubMenu label="QUẢN LÝ THIẾT BỊ">
              <MenuItem component={<Link to="equipmentmanage" />}>
                THIẾT BỊ
              </MenuItem>
            </SubMenu>
          </Menu>
        </Sidebar>
      </div>

      <main style={{ padding: 10, width: 1000 }}>
        <div>
          <button
            className="sb-button btn btn-success mb-4"
            onClick={() => setCollapsed(!collapsed)}
          >
            TOGGLE MENU
          </button>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
