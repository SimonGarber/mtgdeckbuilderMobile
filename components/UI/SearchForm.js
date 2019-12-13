import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity
} from "react-native";
import CardItem from "../CardItem";

const SearchForm = ({ navigation }) => {
  const [cards, setCards] = useState([]);
  const [newQuery, setNewQuery] = useState({
    name: "",
    set: "",
    cmc: "",
    typeLine: "",
    oracleText: "",
    colorIdentity: ""
  });

  const handleNameChange = nameText => {
    setNewQuery({
      ...newQuery,
      name: nameText
    });
  };
  const handleSetChange = setText => {
    setNewQuery({
      ...newQuery,
      set: setText
    });
  };
  const handleTypeLineChange = typeLineText => {
    setNewQuery({
      ...newQuery,
      typeLine: typeLineText
    });
  };
  const handleOracleTextChange = oracleText => {
    setNewQuery({
      ...newQuery,
      oracleText: oracleText
    });
  };
  const handleReset = () => {
    setCards([]);
  };
  async function handleSubmit() {
    try {
      const response = await fetch(
        `https://mtgdeckbuilder-api.herokuapp.com/api/cards/?name=${newQuery.name}&set=${newQuery.set}&cmc=${newQuery.cmc}&typeLine=${newQuery.typeLine}&oracleText=${newQuery.oracleText}&colorIdentity=${newQuery.colorIdentity}`,
        {
          method: "GET",
          mode: "cors"
        }
      );
      const myjson = await response.json();
      const obj = myjson.map(card => {
        if (card.image_uris) {
          return {
            id: card.id,
            image2: card.image_uris.border_crop
              ? card.image_uris.border_crop
              : null,
            image: card.image_uris.normal ? card.image_uris.normal : null,
            image3: card.image_uris.small ? card.image_uris.small : null,
            name: card.name,
            artist: card.artist,
            reserved: card.reserved,
            setName: card.set_name,
            commanderLegal: card.legalities.commander,
            modernLegal: card.legalities.modern,
            legacyLegal: card.legalities.legacy,
            vintageLegal: card.legalities.vintage,
            standardLegal: card.legalities.standard,
            pauperLegal: card.legalities.pauper,
            oldSchoolLegal: card.legalities.oldschool,
            cardType: card.type_line,
            manaCost: card.cmc,
            colorIdentity: card.color_identity.map(identity => {
              return identity;
            }),
            isModern: card.legalities.modern === "legal",
            isLegacy: card.legalities.legacy === "legal",
            isCommander: card.legalities.commander === "legal",
            isVintage: card.legalities.vintage === "restricted" || "legal"
          };
        } else {
          return {
            id: "invalid card data",
            image: null
          };
        }
      });

      setCards(obj);
      setNewQuery({
        name: "",
        set: "",
        cmc: "",
        typeLine: "",
        oracleText: "",
        colorIdentity: ""
      });
    } catch (error) {
      console.log("Error => ", error);
    }
  }
  return (
    <View style={styles.screen}>
      {cards.length < 1 ? (
        <Text style={styles.label}>Card Search</Text>
      ) : (
        <View>
          <Text style={styles.label}>Search Results</Text>
          <Button title="Reset Search" onPress={handleReset} />
        </View>
      )}
      {cards.length < 1 ? (
        <React.Fragment>
          <View>
            <TextInput
              keyboardType="default"
              autoCapitalize="none"
              placeholder="Card Name"
              style={styles.input}
              value={newQuery.name}
              onChangeText={nameText => handleNameChange(nameText)}
            />
            <TextInput
              keyboardType="default"
              autoCapitalize="none"
              placeholder="set"
              style={styles.input}
              value={newQuery.set}
              onChangeText={setText => handleSetChange(setText)}
            />
            <TextInput
              keyboardType="default"
              autoCapitalize="none"
              placeholder="Type Line"
              style={styles.input}
              value={newQuery.typeLine}
              onChangeText={typeLineText => handleTypeLineChange(typeLineText)}
            />
            <TextInput
              keyboardType="default"
              autoCapitalize="none"
              placeholder="Oracle Text"
              style={styles.input}
              value={newQuery.oracleText}
              onChangeText={text => handleOracleTextChange(text)}
            />
          </View>
          <Button title="Submit" onPress={() => handleSubmit()} />
        </React.Fragment>
      ) : (
        <Text></Text>
      )}
      <FlatList
        data={cards}
        keyExtractor={card => card.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ShowCard", {
                  id: item.id,
                  name: item.name,
                  image: item.image
                })
              }
            >
              <CardItem name={item.name} image={item.image} id={item.id} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    width: "100%",
    marginTop: 30
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 15,
    padding: 5,
    margin: 5
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
    marginLeft: 5
  }
});
export default SearchForm;
