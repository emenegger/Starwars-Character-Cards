import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { blue, cyan, presetPrimaryColors } from "@ant-design/colors";
import {
  Descriptions,
  Image,
  Card,
  Button,
  Row,
  Col,
  Layout,
  Typography,
} from "antd";
import { CloseOutlined } from "@ant-design/icons";
import NavHeader from "./NavHeader";

const { Sider, Header, Content } = Layout;
const { Title, Text } = Typography;

const CharPage = (props) => {
  const location = useLocation();
  const state = location.state;

  useEffect(() => {}, [location]);
  console.log(state);

  const gridStyle = {
    width: "25%",
    textAlign: "center",
  };

  const descriptionItems = Object.entries(state)
    .filter((ele) => !Array.isArray(ele[1]) && ele[0] !== "image")
    .map((ele, i) => (
      <Descriptions.Item
        label={ele[0][0].toUpperCase() + ele[0].slice(1)}
        key={ele[0] + i}
      >
        {typeof ele[1] === "string"
          ? ele[1][0].toUpperCase() + ele[1].slice(1)
          : ele[1]}
      </Descriptions.Item>
    ));

  return (
    <>
      <Layout>
        <NavHeader />
        <Content style={{ padding: 20 }}>
          <Row>
            <Col span={6}>
              <Card type="inner" title={state.name} style={{ display: 'flex', flexDirection: 'column'}}>
                <Image
                  width={200}
                  src={state.image}
                  placeholder={<Image preview={false} src={state.img} />}
                />
              </Card>
            </Col>
            <Col span={18}>
              <Card type="inner">
                <Descriptions
                  title={`${state.name}'s Bio`}
                  bordered
                  column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                >
                  {descriptionItems}
                  <Descriptions.Item label="Masters">
                    {state.masters && Array.isArray(state.masters) ? (
                      state.masters.map((master, i) => (
                        <p key={master + i}>{master}</p>
                      ))
                    ) : (
                      <p>None</p>
                    )}
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
};

export default CharPage;
