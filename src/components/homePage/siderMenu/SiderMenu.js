import React, { useState } from "react";
import { Menu, Row, Col, Avatar, Layout } from "antd";
import { Link } from "react-router-dom";

import {
  DashboardOutlined,
  NotificationOutlined,
  BookOutlined,
  CalendarOutlined,
  TeamOutlined,
  UserOutlined,
  DisconnectOutlined,
  FundProjectionScreenOutlined,
  SlackOutlined,
  YoutubeOutlined,
  RocketOutlined,
} from "@ant-design/icons";

import * as ROUTES from "../../../constants/routes";

const { Sider } = Layout;
const { SubMenu } = Menu;

const SiderMenu = ({ match, keys, setSelectedKey, selectedKey }) => {
  console.log(keys)
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  return (
    <Sider
      style={{ backgroundColor: "#12284C" }}
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      breakpoint="md"
      collapsedWidth="0"
    >
      <Row type="flex">
        <Col span={24} align="center">
          <div className="username" style={{ paddingTop: "30px" }}>
            <Col span={24} align="center">
              <Avatar
                size={{
                  xs: 32,
                  sm: 40,
                  md: 40,
                  lg: 64,
                  xl: 80,
                  xxl: 80,
                }}
                icon={<UserOutlined />}
              />
            </Col>
          </div>
        </Col>
        <Col span={24} align="center">
          <div className="username" style={{ paddingBottom: "30px" }}>
            Staff Name
          </div>
        </Col>
      </Row>

    </Sider>
  );
};

export default SiderMenu;
