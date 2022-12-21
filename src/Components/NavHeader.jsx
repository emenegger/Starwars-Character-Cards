import React from "react";
import { blue, cyan, presetPrimaryColors } from "@ant-design/colors";
import { Layout, Input, Typography, Row, message } from "antd";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;
const { Sider, Header, Content } = Layout;

const NavHeader = () => {
  return (
    <Header
      style={{
        height: 90,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      className="header"
    >
      <Link to="/">
      <Title level={2} style={{ color: presetPrimaryColors.volcano }}>
        Starwars Character Cards
      </Title>
      </Link>
      <Title level={4} style={{ color: presetPrimaryColors.volcano }}>
        {" "}
        Search for your character and collect a card
      </Title>
    </Header>
  );
};

export default NavHeader;
