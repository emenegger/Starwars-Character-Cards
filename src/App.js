// import "./App.css";
import { useEffect, useState } from "react";
import { blue, cyan, presetPrimaryColors } from "@ant-design/colors";
import { Layout, Input, Typography, Row, message, Select } from "antd";
import CharCard from "./Components/CharCard";
import { useCharactersContext } from "./context/characters-context";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { characterActions } from "./store/index";

const { Sider, Header, Content } = Layout;
const { Title, Text } = Typography;
const { Search } = Input;

function App() {
  const [messageApi, contextHolder] = message.useMessage();

  const [characters, setCharacters] = useCharactersContext([]);

  const [swChars, setSwChars] = useState([]);

  const chars = useSelector((state) => state.characters);

  const dispatch = useDispatch();
  
  useEffect(() => {
    axios
      .get("https://akabab.github.io/starwars-api/api/all.json")
      .then((response) => setSwChars(response.data));
      console.log("swChars", swChars);
  }, []);

  const options = swChars.map((ele) => {
    return {
      value: ele.name,
      label: ele.name,
    };
  });

  // ** previous onSearch function
  // const onSearch = async (input) => {
  //   console.log("input", input);

  //   const result = await axios.get(
  //     "https://akabab.github.io/starwars-api/api/all.json"
  //   );
  //   const { data } = result;
  //   console.log(data);
  //   const inputChar = data.find((ele) => ele.name === input);
  //   console.log(inputChar)
  //   if (inputChar) {
  //     setCharacters((arr) => [...arr, data.find((ele) => ele.name === input)]);
  //     // dispatch({ type: "addCharacters", addedChar: inputChar });
  //     dispatch(characterActions.addCharacter(inputChar));
  //     console.log("chars from redux", chars);
  //     messageApi.destroy();
  //     messageApi.open({
  //       type: "success",
  //       content: "Added!",
  //     });
  //   } else {
  //     messageApi.destroy();
  //     messageApi.open({
  //       type: "error",
  //       content: "There is no character with that name. Please try again.",
  //     });
  //   }
  // };

  const onChange = (value) => {
    const inputChar = swChars.find((ele) => ele.name === value);
    if (inputChar) {
      dispatch(characterActions.addCharacter(inputChar));
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
  };

  let cards = chars?.map((character, i) => (
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
            <Text>Select a character:</Text>
            {/* <Search
              placeholder="search for your character here"
              enterButton="Search"
              onSearch={onSearch}
            /> */}
            <Select
              showSearch
              placeholder="Select a person"
              optionFilterProp="children"
              onChange={onChange}
              size='large'
              style={{minWidth: 200}}
              // onSearch={onSelect}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={options}
            />
            <Row
              style={{ paddingTop: 20 }}
              // gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
              gutter={{ xs: 4, sm: 8, md: 12, lg: 16 }}
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
