import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import BookList from "../../components/BookList";
import GradientBg from "../../components/GradientBg";
const BookSeccion = () => {
    return (
        <SafeAreaView>
            <GradientBg>
                <View style={{alignItems: "center", flex: 1, paddingTop: 5, position: "relative"}}>
                    <Text style={{fontSize: 36}}> Mis Libros</Text>
                    <BookList />
                </View>
            </GradientBg>
        </SafeAreaView>
    )
}
export default BookSeccion