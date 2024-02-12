import React from "react";
import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, Linking } from "react-native";
import GradientBg from "../../components/GradientBg";


const Home = () => {
    const openGithub = () => {
        Linking.openURL("https://github.com/tuusuario")
    };

    const openLinkedIn = () => {
        Linking.openURL("https://www.linkedin.com/in/tuperfil/")
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <GradientBg>
                <View style={styles.container}>
                    <Text style={styles.title}>Welcome to the BookStore App created by Juan Miguel for Bubbo</Text>
                    <Text style={styles.text}>Quiero utilizar esta parte para poder agradecer al equipo de Bubbo por darme la oportunidad de demostrar mis conocimientos y habilidades. Espero que la app sea de su agrado. Saludos!</Text>
                    <View style={styles.imageContainer}>
                        <Image source={require("../../assets/CapturaPulgar.png")} style={styles.image} />
                    </View>
                </View>
                <View style={styles.iconsContainer}>
                    <TouchableOpacity onPress={openGithub}>
                        <Image source={require("../../assets/github_icon.png")} style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={openLinkedIn}>
                        <Image source={require("../../assets/linkedin_icon.png")} style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </GradientBg>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
        color: "#333", 
        textAlign: "center",
        marginBottom: 10,
    },
    imageContainer: {
        backgroundColor: "#222", 
        borderRadius: 100,
        padding: 10,
        marginBottom: 20,
    },
    image: {
        width: 180,
        height: 180,
        resizeMode: 'contain',
    },
    iconsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        position: 'absolute',
        bottom: 20,
    },
    icon: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
    },
});

export default Home;
