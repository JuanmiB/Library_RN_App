import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, SafeAreaView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import GradientBg from "../../components/GradientBg";
import Config from "react-native-config"
const BookDetails = () => {
    const route = useRoute();
    const { id } = route.params
    const [book, setBook] = React.useState({})
    const [loading, setLoading] = React.useState(true)
    const navigation = useNavigation()

    const getBookById = async () => {
        try {
            const response = await fetch(`${Config.URL_API}${id}`)
            const data = await response.json()
            setBook(data.input)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    };

    React.useEffect(() => {
        getBookById()
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
        <GradientBg>
            {loading ? (
                <Text style={{ color: "#FFF" }}>Cargando...</Text>
            ) : (
                <ScrollView contentContainerStyle={styles.container}>
                    <TouchableOpacity
                        style={styles.menuButton}
                        onPress={() => navigation.navigate("AddBook", { id })}
                    >
                        <Text style={styles.menuButtonText}>...</Text>
                    </TouchableOpacity>

                    <Image source={{ uri: book.img }} style={styles.bookImage} />

                    <Text style={styles.title}>{book.title}</Text>
                    <Text style={styles.author}>{book.author}</Text>
                    <Text style={styles.category}>{book.category}</Text>

                    <View style={styles.infoContainer}>
                        <View style={styles.info}>
                            <Text style={styles.infoText}>{book.year}</Text>
                            <Text style={styles.infoLabel}>Lanzamiento</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.infoText}>{book.lang}</Text>
                            <Text style={styles.infoLabel}>Idioma</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.infoText}>{book.read ? "Leido" : "No leido"}</Text>
                            <Text style={styles.infoLabel}>Estado</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <Text style={styles.generalInfo}>Descripción</Text>
                    <Text style={styles.description}>{book.description}</Text>
                </ScrollView>
            )}
        </GradientBg>
        </SafeAreaView>
    );
};

const styles = {
    container: {
        alignItems: "center",
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#19222B",
        margin: 10,
        borderRadius: 10,


    },
    menuButton: {
        alignSelf: "flex-end",
    },
    menuButtonText: {
        fontSize: 30,
        color: "#FFF",
    },
    bookImage: {
        width: 200,
        height: 300,
        borderRadius: 10,
        marginVertical: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        textAlign: "center",
        color: "#FFFAF0",
        maxWidth: "80%",
    },
    description: {
        fontSize: 20,
        color: "#BD9240",
        opacity: 0.5,
        textAlign: "center",
        marginBottom: 20,
    },
    category: {
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        backgroundColor: "#BD9240",
        color: "#DDD6CC",
        marginTop: 5,
    },
    author: {
        fontSize: 15,
        color: "#FFFAF0",
        opacity: 0.8,
        marginTop: 2,
    },
    generalInfo: {
        fontSize: 24,
        color: "#FFFAF0",
        textAlign: "center",
        padding: 5,
    },
    infoContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
        gap: 10,
    },
    info: {
        alignItems: "center",
        padding: 10,
        width: 105,
    },
    infoText: {
        fontSize: 20,
        color: "#FEF9E0",
        fontWeight: "bold",
    },
    infoLabel: {
        color: "#DDD6CC",
        textAlign: "center",
    },
    divider: {
        width: "100%",
        borderWidth: 1,
        opacity: 0.1,
        marginVertical: 10,
    },
};

export default BookDetails