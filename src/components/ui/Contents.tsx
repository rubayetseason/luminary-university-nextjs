"use client";
import React from "react";

import { Layout, theme } from "antd";

const { Header, Content, Footer } = Layout;

const Contents = ({ children }: { children: React.ReactNode }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Header style={{ padding: 0, background: colorBgContainer }} />
      <Content style={{ margin: "24px 16px 0" }}>
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

{
  /* <Content style={{ margin: "24px 16px 0", minHeight: "100vh" }}>
{children}
</Content> */
}
