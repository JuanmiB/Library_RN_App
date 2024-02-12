import React from "react";
import { View, Text, Button, FlatList, StyleSheet, ScrollView, RefreshControl } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BookCard from "../BookCard";
import { TouchableOpacity } from "react-native-gesture-handler";
import Config from "react-native-config";

const BookList = () => {
    const [books, setBooks] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const[refreshing, setRefreshing] = React.useState(false)
    const getBooks = () => {
        try {
            fetch(`${Config.URL_API}`)
                .then((res) => res.json())
                .then((data) => {
                    setBooks(data)
                    setLoading(false)
                })
        }
        catch (error) {
            console.log(error)
        }
    }
    React.useEffect(() => {
        getBooks()
    }, [])

    const navigation = useNavigation();
    return (
        <>

            {
                loading ? <Text>Cargando...</Text> : (
                    <>
                           
                        {books.length === 0 ? (
                            <ScrollView style={styles.emptyContainer}
                             onPress={getBooks}
                             refreshControl={
                                    <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={getBooks}
                                    />
                             }
                             >
                                <Text style={styles.emptyText}>No hay libros. Agregue uno y refresque.</Text>
                            </ScrollView>
                        ) : (
                            <FlatList
                                refreshing={false}
                                onRefresh={getBooks}
                                data={books}
                                keyExtractor={(item) => item.id}
                                numColumns={2}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item: book }) => (
                                    <BookCard book={book} />
                                )}
                            />
                        )}
                        <View style={styles.containerAbsolute}>
                            <TouchableOpacity
                                style={styles.containerRelative}
                                onPress={() => navigation.navigate("AddBook")}
                            >
                                <Text style={styles.addButton}>+</Text>
                            </TouchableOpacity>
                        </View>
                    
                        {/* <FlatList
                            refreshing={false}
                            onRefresh={getBooks}
                            data={books}
                            keyExtractor={(item) => item.id}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                            scrollEnabled={true}
                            columnWrapperStyle={styles.columnWrapper}
                            renderItem={({ item: books }) => (
                                <BookCard book={books} />
                            )}
                        />

                        <View style={styles.containerAbsolute}>
                            <TouchableOpacity
                                style={styles.containerRelative}
                                onPress={() => navigation.navigate("AddBook")}
                            >
                                <Text style={styles.addButton}>+</Text>
                            </TouchableOpacity>
                        </View> */}
                    </>
                )
            }
        </>
    )
}

const styles = StyleSheet.create({
    containerAbsolute: {
        position: "absolute",
        top: "90%",
        left: "85%",

    },
    containerRelative: {
        borderWidth: 1,
        borderRadius: 50,
        padding: 10,
        borderColor: "#000",
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#e9e9e9"
    },
    addButton: {
        fontSize: 20,
        width: 55,
        textAlign: "center",
        color: "black",


    },
    colorcolumnWrapper: {
        marginHorizontal: 10,
    },
})
export default BookList;