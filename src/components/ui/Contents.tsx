"use client";
import React from "react";
import { Layout, theme } from "antd";
import Header from "./Header";

const { Content, Footer } = Layout;

const Contents = ({ children }: { children: React.ReactNode }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Header></Header>
      <div style={{ paddingLeft: "50px", paddingTop: "10px" }}></div>
      <Content style={{ margin: "0 15px" }}>
        <div
          style={{ padding: 24, minHeight: 360, background: colorBgContainer }}
        >
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Luminary University ©2023 Created by Rubayet Islam Season
      </Footer>
    </Layout>
  );
};

export default Contents;
