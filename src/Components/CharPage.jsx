import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Descriptions, Image, Card, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

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
    .filter((ele) => !Array.isArray(ele[1]))
    .map((ele, i) => (
      <Descriptions.Item label={ele[0]} key={ele[0]+i}>
        {ele[1]}
      </Descriptions.Item>
    ));

  return (
    <>
      <Card>
        <Card type="inner" title={state.name} >
          <Button type="primary" shape="circle" icon={<CloseOutlined />} />
          <Image
            width={200}
            src={state.image}
            placeholder={<Image preview={false} src={state.img} width={200} />}
          />
          <Descriptions
            title={`${state.name}'s Bio`}
            bordered
            column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
          >
            {descriptionItems}
            <Descriptions.Item label="Masters">
              {state.masters.map((master, i) => (
                <p key={master + i}>{master}</p>
              ))}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </Card>
    </>
  );
};

export default CharPage;
