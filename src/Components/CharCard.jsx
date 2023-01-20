import React, { useEffect, useState } from "react";
import { Card, Col, Button, Space, message } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useCharactersContext } from "../context/characters-context";
import { Link } from "react-router-dom";

const { Meta } = Card;



const CharCard = (props) => {
  const [characters, setCharacters] = useCharactersContext([]);
  const [messageApi, contextHolder] = message.useMessage();

  const onDelete = (e) => {
    e.preventDefault();
    setCharacters(characters.filter(ele => ele !== character));
    console.log('filtered characters:', characters);
    // let i = characters.indexOf(character); 
    // characters.splice(i, 1);
    // setCharacters(characters);
    // console.log('spliced characters',characters)
    messageApi.destroy();
    messageApi.open({
      type: "warning",
      content: "Deleted",
      duration: 0,
    });
  };


  const { character } = props;
  return (
    <Col className="gutter-row" span={6}>
      {contextHolder}
      <Card
        hoverable
        // style={{ width: 240 }}
        cover={<img alt={character?.name} src={character?.image} />}
      >
        <Meta title={character?.name} description={character?.species[0].toUpperCase() + character?.species.slice(1)} />
        <Space direction="horizontal" style={{ width: "100%", paddingTop: 10, display: 'flex', justifyContent: 'space-between', }}>
          <Button type="primary" style={{ width: "100%" }}>
            <Link to="/CharPage" state={character} style={{textDecoration: 'none', color: 'white'}}>
            More Details
            </Link>
          </Button>
          <Button
            type="primary"
            shape="circle"
            id={character.id}
            icon={<CloseOutlined />}
            onClick={onDelete}
          />
        </Space>
      </Card>
    </Col>
  );
};

export default CharCard;
