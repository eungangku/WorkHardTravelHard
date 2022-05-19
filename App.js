import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Alert } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from "./colors";

STORAGE_KEY = "@todos";

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [todos, setTodos] = useState({});
  const work = () => setWorking(true);
  const travel = () => setWorking(false);
  const onChangeText = (event) => setText(event);
  const saveTodos = async (newTodo) => {
    const s = JSON.stringify(newTodo);
    await AsyncStorage.setItem(STORAGE_KEY, s);
  };
  const loadTodos = async () => {
    const loadedTodos = await AsyncStorage.getItem(STORAGE_KEY);
    console.log(loadedTodos);
    setTodos(JSON.parse(loadedTodos));
  };
  const addTodo = async () => {
    const newTodo = Object.assign({}, { [Date.now()]: { text, working } }, todos);
    setTodos(newTodo);
    await saveTodos(newTodo);
    setText("");
  };
  const deleteTodo = (key) => {
    Alert.alert("Delete Todo", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: () => {
          const newTodo = { ...todos };
          delete newTodo[key];
          setTodos(newTodo);
          saveTodos(newTodo);
        },
      },
    ]);
  };
  const finishTodo = () => {};

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text style={{ ...styles.btnText, color: working ? "white" : theme.gray }}>Work</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text style={{ ...styles.btnText, color: working ? theme.gray : "white" }}>Travel</Text>
        </TouchableOpacity>
      </View>
      <TextInput onSubmitEditing={addTodo} onChangeText={onChangeText} value={text} placeholder={working ? "What are you going to do?" : "Where do you want to travel?"} style={styles.input}></TextInput>
      <ScrollView>
        {Object.keys(todos).map((key) =>
          working === todos[key].working ? (
            <View key={key} style={styles.todo}>
              <Text style={styles.todoText}>{todos[key].text}</Text>
              <View style={styles.todoBtnContainer}>
                <TouchableOpacity onPress={() => finishTodo(key)}>
                  <MaterialIcons name="check-circle" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteTodo(key)}>
                  <MaterialIcons name="delete" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          ) : null
        )}
      </ScrollView>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    backgroundColor: theme.bg,
  },
  header: {
    marginTop: 100,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btnText: {
    fontSize: 38,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 18,
  },
  todo: {
    backgroundColor: theme.todoBg,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  todoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  todoBtnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
