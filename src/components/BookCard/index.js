import React from "react"
import { View, Text, StyleSheet, Alert, TouchableOpacity, Image } from "react-native"
import { useNavigation } from "@react-navigation/native"


const BookCard = ({book}) => {
    const navigation = useNavigation()

    const handleLongPress = () => {
      Alert.alert(
        `Eliminar "${book.input.title}"`,
        '¿Estás seguro de que deseas eliminar este elemento?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Eliminar',
            onPress: () => onDelete(book.id),
            style: 'destructive',
          },
        ],
        { cancelable: true }
      );
    }

    const onDelete = (id) => {
      fetch(`http://192.168.0.7:3000/api/books/${id}`, {
        method: 'DELETE',
      })
      .then(res => res.json())
    }


    return (
      <TouchableOpacity
      onPress={() => navigation.navigate("BookDetails", {id: book.id})}
      onLongPress={handleLongPress}
      style={{ maxWidth: 150, maxHeight: 200, borderRadius: 5, margin: 20 }}
      >
        <View style={styles.container}>
           <Image source={{uri: book.input.img}} style={{width: 142, height: 195, borderRadius:1 }} />
            <Text>{book.title}</Text>
        </View>
      </TouchableOpacity>
       
    )
}
const styles = StyleSheet.create({
    container: {
        borderWidth: 4,
        borderRadius: 3,
        borderColor: "#000",
        width: 150,
        height: 200,
    }
})



export default BookCard;