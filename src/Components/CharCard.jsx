import React, { useEffect, useState } from "react";
import { Card, Col, Button, Space, message, Typography } from "antd";
import { CloseOutlined, HeartTwoTone, HeartOutlined } from "@ant-design/icons";
import { useCharactersContext } from "../context/characters-context";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { characterActions } from "../store/index";

const { Paragraph, Text } = Typography;

const { Meta } = Card;

const CharCard = (props) => {
  const { character } = props;

  const [characters, setCharacters] = useCharactersContext([]);
  const [messageApi, contextHolder] = message.useMessage();

  const chars = useSelector((state) => state.characters);
  const dispatch = useDispatch();

  const [liked, setLiked] = useState(false);

  const onLike = (e) => {
    console.log("on like func activated. Liked is:", liked);
    e.preventDefault();
    setLiked(!liked);
    dispatch(
      characterActions.likeCharacter({ add: liked, character: character })
    );
  };

  const onDelete = (e) => {
    e.preventDefault();
    messageApi.destroy();
    messageApi.open({
      type: "warning",
      content: "Deleted",
      duration: 1000,
    });
    // useContext
    setCharacters(characters.filter((ele) => ele !== character));
    console.log("filtered characters:", characters);
    // Redux
    const updatedChars = chars.filter((ele) => ele !== character);
    dispatch(characterActions.deleteCharacter(updatedChars));
  };

  return (
    <Col
      className="gutter-row"
      xs={{
        span: 22,
        offset: 1,
      }}
      sm={{
        span: 11,
        offset: 1,
      }}
      lg={{
        span: 7,
        offset: 1,
      }}
      xl={{
        span: 5,
        offset: 1,
      }}
    >
      {contextHolder}
      <Card
        hoverable
        cover={<img alt={character?.name} src={character?.image} />}
        actions={[
          <Button type="primary" style={{ width: "80%" }} size="sm">
            <Link
              to="/CharPage"
              state={character}
              style={{ textDecoration: "none", color: "white" }}
            >
              Details
            </Link>
          </Button>,
          <Button
            type="primary"
            danger
            id={character.id}
            onClick={onDelete}
            style={{ width: "80%" }}
          >
          Delete
          </Button>,
          liked ? (
            <HeartTwoTone twoToneColor="#eb2f96" onClick={onLike} />
          ) : (
            <HeartOutlined onClick={onLike} />
          ),
        ]}
      >
        <Meta
          title={character?.name}
          description={
            character?.species[0].toUpperCase() + character?.species.slice(1)
          }
        />
        <Space
          direction="horizontal"
          style={{
            width: "100%",
            paddingTop: 10,
            display: "flex",
            justifyContent: "space-between",
          }}
        ></Space>
      </Card>
    </Col>
  );
};

export default CharCard;
