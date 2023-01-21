import React, { useEffect, useState } from "react";
import { Card, Col, Button, Space, message } from "antd";
import { CloseOutlined, HeartTwoTone, HeartOutlined } from "@ant-design/icons";
import { useCharactersContext } from "../context/characters-context";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { characterActions } from "../store/index";

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
    dispatch(characterActions.likeCharacter({add: liked, character: character}))
  };

  const onDelete = (e) => {
    e.preventDefault();
    // useContext
    setCharacters(characters.filter((ele) => ele !== character));
    console.log("filtered characters:", characters);
    // Redux
    const updatedChars = chars.filter((ele) => ele !== character);
    dispatch(characterActions.deleteCharacter(updatedChars));

    messageApi.destroy();
    messageApi.open({
      type: "warning",
      content: "Deleted",
      duration: 0,
    });
  };

  return (
    <Col className="gutter-row" span={6}>
      {contextHolder}
      <Card
        hoverable
        // style={{ width: 240 }}
        cover={<img alt={character?.name} src={character?.image} />}
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
        >
          <Button type="primary" style={{ width: "100%" }}>
            <Link
              to="/CharPage"
              state={character}
              style={{ textDecoration: "none", color: "white" }}
            >
              More Details
            </Link>
          </Button>
          <Button
            type="primary"
            danger
            id={character.id}
            onClick={onDelete}
          >
            Delete
          </Button>
          {liked ? (
            <HeartTwoTone twoToneColor="#eb2f96" onClick={onLike} />
          ) : (
            <HeartOutlined onClick={onLike} />
          )}
        </Space>
      </Card>
    </Col>
  );
};

export default CharCard;
