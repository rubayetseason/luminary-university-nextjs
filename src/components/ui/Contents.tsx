"use client";
import React from "react";

import { Layout, theme } from "antd";
import BreadCrumb from "./BreadCrumb";

const { Header, Content, Footer } = Layout;

const Contents = ({ children }: { children: React.ReactNode }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const base = "admin";

  return (
    <Layout>
      <Header style={{ padding: 0, background: colorBgContainer }} />
      <div style={{ paddingLeft: "50px", paddingTop: "15px" }}>
        <BreadCrumb
          items={[
            {
              label: `${base}`,
              link: `/${base}`,
            },
            {
              label: `student`,
              link: `/${base}/student`,
            },
          ]}
        />
      </div>
      <Content style={{ margin: "15px 15px 0" }}>
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