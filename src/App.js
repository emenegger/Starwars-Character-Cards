import logo from "./logo.svg";
// import "./App.css";
import { useEffect, useState } from "react";
import { blue, cyan, presetPrimaryColors } from "@ant-design/colors";
import { Layout, Input, Typography, Row, message } from "antd";
import CharCard from "./Components/CharCard";
import { useCharactersContext } from "./context/characters-context";

const { Sider, Header, Content } = Layout;
const { Title, Text } = Typography;
const { Search } = Input;

function App() {
  const [messageApi, contextHolder] = message.useMessage();

  const [characters, setCharacters] = useCharactersContext([]);

  // const [cards, setCards] = useState(characters?.map((character, i) => (
  //   <CharCard character={character} key={character.name + i} />
  // )));

  // useEffect(()=>{
  //   setCards()
  // },[characters])

  const onSearch = (input) => {
    console.log("input", input);
    fetch("https://akabab.github.io/starwars-api/api/all.json")
      .then((response) => response.json())
      .then((data) => {
        console.log("data from api:", data);
        messageApi.open({
          type: "loading",
          content: "Loading",
          duration: 0,
        });
        // console.log(data);
        const inputChar = data.find((ele) => ele.name === input);
        if (inputChar) {
          setCharacters((arr) => [
            ...arr,
            data.find((ele) => ele.name === input),
          ]);
          messageApi.destroy();
          messageApi.open({
            type: "success",
            content: "Added!",
          });
        } else {
          messageApi.destroy();
          messageApi.open({
            type: "error",
            content: "There is no character with that name. Please try again.",
          });
        }
      })
      .catch((err) => console.log("err", err));
  };

  let cards = characters?.map((character, i) => (
    <CharCard character={character} key={character.name + i} />
  ));

  return (
    <>
      <div className="App">
        {contextHolder}
        <Layout>
          <Header
            style={{
              height: 90,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            className="header"
          >
            <Title level={2} style={{ color: presetPrimaryColors.volcano }}>
              Starwars Character Cards
            </Title>
            <Title level={4} style={{ color: presetPrimaryColors.volcano }}>
              {" "}
              Search for your character and collect a card
            </Title>
          </Header>
          <Content style={{ padding: 20 }}>
            <Search
              placeholder="search for your character here"
              enterButton="Search"
              onSearch={onSearch}
            />
            <Row
              style={{ paddingTop: 20 }}
              gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
            >
              {cards}
            </Row>
          </Content>
        </Layout>
      </div>
    </>
  );
}

export default App;

// Star Wars Character App
// fetch from the api to return a card of the characters
