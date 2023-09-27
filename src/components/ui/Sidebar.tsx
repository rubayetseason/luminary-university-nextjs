"use client";
import React from "react";
import { Layout, Menu } from "antd";
import { USER_ROLE } from "@/constants/role";
import { SidebarItems } from "@/constants/sidebarItems";

const { Sider } = Layout;

const Sidebar = () => {
  const role = USER_ROLE.SUPER_ADMIN;

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {}}
      onCollapse={(collapsed, type) => {}}
      style={{
        height: "100vh",
        position: "sticky",
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div
        style={{
          color: "white",
          fontSize: "1rem",
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: "1rem",
          marginTop: "1rem",
        }}
      >
        Luminary University
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={SidebarItems(role)}
      />
    </Sider>
  );
};

export default Sidebar;
