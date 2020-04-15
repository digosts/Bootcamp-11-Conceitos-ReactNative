import React, {useState, useEffect} from "react";
import api from './services/api';

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function App() { 
  const [repositories, setRepositories] = useState([]);
  const [likes, setLikes] = useState(0);

  async function loadRepositories(){
    const response = await api.get('/repositories');

    setRepositories(response.data);
  }

  useEffect(()=>{
    loadRepositories();
  },[])

  async function handleLikeRepository(id) {
    await api.post(`/repositories/${id}/like`);

    const repositorieIndex = repositories.findIndex(repo => repo.id === id);
    let updRepos = repositories;

    const upLike = updRepos[repositorieIndex].likes++;

    setLikes(upLike);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <Text style={styles.likes}>{likes}</Text>
        <FlatList
          style={styles.repositoriesList}
          keyExtractor={repositorie => String(repositorie.id)}
          //showsVerticalScrollIndicator={false}
          data={repositories}
          renderItem={({item: repositorie}) => (
            <View style={styles.repositoryContainer}>
              <Text style={styles.repository}>{repositorie.title}</Text>

              <View style={styles.techsContainer}>
                {repositorie.techs.map( tech => 
                  <Text style={styles.tech}>
                    {tech}
                  </Text>
                )}
              </View>

              <View style={styles.likesContainer}>
                <Text
                  style={styles.likeText}
                  testID={`repository-likes-${repositorie.id}`}
                >
                  {repositorie.likes}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleLikeRepository(repositorie.id)}
                testID={`like-button-${repositorie.id}`}
              >
                <Text style={styles.buttonText}>Curtir</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  likes:{
    color:'#7159c1',
  },
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoriesList:{
    marginTop:30,
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
