import React, { useEffect, useState } from "react";
import { Card, Col, Button, Space, message } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useCharactersContext } from "../context/characters-context";

const { Meta } = Card;



const CharCard = (props) => {
  const [characters, setCharacters] = useCharactersContext([]);
  const [deleteCard, setDeleteCard] = useState(false)
  const [messageApi, contextHolder] = message.useMessage(); //** fix this later

  const onDelete = (e) => {
    e.preventDefault();
    console.log("e.currentTarget.id", e.currentTarget.id);
    let i = characters.indexOf(character);
    characters.splice(i, 1);
    setCharacters(characters);
    // setDeleteCard(true);
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
      <Card
        hoverable
        // style={{ width: 240 }}
        cover={<img alt={character?.name} src={character?.image} />}
      >
        <Meta title={character?.name} description={character?.species} />
        <Space direction="horizontal" style={{ width: "100%", paddingTop: 10 }}>
          <Button type="primary" style={{ width: "100%" }}>
            {/* <Link to="/CharPage" state={character}> */}
            More Details
            {/* </Link> */}
          </Button>
          <Button
            type="primary"
            shape="circle"
            id={character.id}
            icon={<CloseOutlined />}
            onClick={onDelete}
          />
          {contextHolder}
        </Space>
      </Card>
    </Col>
  );
};

export default CharCard;
