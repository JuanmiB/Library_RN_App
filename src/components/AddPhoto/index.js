import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const AddPhoto = ({ showPhoto, photo}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => showPhoto()}
            >
                
                  {
                        photo ?
                        <Image source={{ uri: photo }} style={styles.image} />
                        :
                      <Text style={styles.plusSign}>+</Text>
                  }
                
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 100,
        height: 150,
        backgroundColor: "gray",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    plusSign: {
        fontSize: 40
    },
    image: {
        width: 100,
        height: 150
    }
})

export default AddPhoto