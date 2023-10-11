import {
  Avatar,
  Button,
  Dropdown,
  Layout,
  MenuProps,
  Row,
  Space,
  theme,
} from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Header: AntHeader } = Layout;

import React from "react";
import { useRouter } from "next/navigation";
import { getUserInfo, removeUserInfo } from "@/services/auth.services";
import { authKey } from "@/constants/authKey";

const Header = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const router = useRouter();

  const logOut = () => {
    removeUserInfo(authKey);
    router.push("/");
  };

  const { role } = getUserInfo() as any;

  const items: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <Button onClick={logOut} type="primary" size="middle" danger>
          Logout
        </Button>
      ),
    },
  ];

  return (
    <AntHeader style={{ padding: 0, background: colorBgContainer }}>
      <Row
        justify="end"
        align="middle"
        style={{
          height: "100%",
          paddingRight: "10px",
        }}
      >
        <p
          style={{
            margin: "0px 5px",
          }}
        >
          {role}
        </p>
        <Dropdown menu={{ items }}>
          <a>
            <Space wrap size={16}>
              <Avatar
                style={{ border: "1px solid lightgrey" }}
                icon={<UserOutlined />}
              />
            </Space>
          </a>
        </Dropdown>
      </Row>
    </AntHeader>
  );
};

export default Header;
