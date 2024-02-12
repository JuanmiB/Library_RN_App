import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput, ScrollView, Switch, Alert } from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import { SelectList } from 'react-native-dropdown-select-list';
import { CurrentFormContext } from "../../context";
import AddPhoto from "../AddPhoto";

const FormAddBook = ({ submitBook, updateBook, hasBook }) => {
    const { form, setForm } = React.useContext(CurrentFormContext)
    const [isSuccess, setIsSuccess] = useState(null)

    const data = [
        { key: '1', value: 'Ficción' },
        { key: '2', value: 'No ficción' },
        { key: '3', value: 'Infantil y juvenil' },
        { key: '5', value: 'Educación y aprendizaje' },
        { key: '6', value: 'Autoayuda y desarrollo personal' },
        { key: '7', value: 'Religión y espiritualidad' },
        { key: '8', value: 'Ciencia ficción y fantasía' },
        { key: '9', value: 'Negocios y finanzas' },
        { key: '10', value: 'Cocina' },
        { key: '11', value: 'Historia' },
        { key: '12', value: 'Biografías y memorias' },
    ];

    const handleAddPhoto = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            setForm({ ...form, img: image.path })
        }).catch((error) => {
            console.log(error)
        });
    };

    const handleSubmission = async () => {
        try {
            if (hasBook) {
                await updateBook()
            } else {
                await submitBook()
            }
            setIsSuccess(true)
            setForm({})
        } catch (error) {
            setIsSuccess(false)
            console.error("Error al subir el libro:", error)
        }
    };

    const showAlert = () => {
        if (isSuccess === true) {
            Alert.alert("Éxito", "El libro se ha subido correctamente", [{ text: "OK", onPress: () => setIsSuccess(null) }])
        } else if (isSuccess === false) {
            Alert.alert("Error", "Hubo un problema al subir el libro. Por favor, inténtalo de nuevo.", [{ text: "OK", onPress: () => setIsSuccess(null) }])
        }
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <Text style={styles.title}>Agrega un nuevo libro</Text>
                <TextInput
                    placeholderTextColor={"#FFF"}
                    style={styles.input}
                    placeholder="Titulo"
                    value={form.title}
                    onChangeText={(text) => setForm({ ...form, title: text })}
                />
                <TextInput
                    placeholderTextColor={"#FFF"}
                    style={styles.input}
                    placeholder="Autor"
                    value={form.author}
                    onChangeText={(text) => setForm({ ...form, author: text })}
                />
                <SelectList
                    dropdownTextStyles={{ color: "#FFF" }}
                    inputStyles={{ color: "#FFF" }}
                    search={false}
                    onSelect={(val) => { console.log(val) }}
                    setSelected={(val) => setForm({ ...form, category: val })}
                    maxHeight={300}
                    data={data}
                    keyExtractor={(item) => item.key}
                    save="value"
                    placeholder={form.category ? form.category : "Categorías"}
                    boxStyles={styles.selectList}
                />
                <TextInput
                    placeholderTextColor={"#FFF"}
                    style={styles.input}
                    placeholder="Lenguaje"
                    value={form.lang}
                    onChangeText={(text) => setForm({ ...form, lang: text })}
                />
                <TextInput
                    placeholderTextColor={"#FFF"}
                    style={styles.input}
                    placeholder="Año de publicación"
                    keyboardType="numeric"
                    value={form.year}
                    onChangeText={(text) => setForm({ ...form, year: text })}
                />
                <TextInput
                    placeholderTextColor={"#FFF"}
                    style={[styles.input, { height: 120 }]}
                    placeholder="Descripción"
                    multiline={true}
                    value={form.description}
                    onChangeText={(text) => setForm({ ...form, description: text })}
                />
                <View style={styles.switchContainer}>
                    <Text style={{ color: "#FFF" }}>{form.read ? "Leído" : "No leído"}</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={form.read ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={(value) => setForm({ ...form, read: value })}
                        value={form.read}
                    />
                </View>
                <View style={styles.addPhotoContainer}>
                    <AddPhoto showPhoto={handleAddPhoto} photo={form.img} />
                </View>
                <Button
                    title={hasBook ? "Actualizar libro" : "Subir Libro"}
                    onPress={handleSubmission}
                />
                {showAlert()}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#19222B",
        justifyContent: "center",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        margin: 20,
        marginBottom: 60,
    },
    title: {
        alignSelf: "center",
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 20,
        color: "#FFFAF0",
    },
    input: {
        maxHeight: 90,
        maxWidth: 300,
        marginVertical: 10,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        color: "#FFF",
    },
    selectList: {
        maxWidth: 300,
        marginVertical: 10,
    },
    switchContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 20,
        marginVertical: 10,
        margin: 1,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        width: 300,
    },
    addPhotoContainer: {
        alignItems: "center",
        marginVertical: 10,
    },
});

export default FormAddBook
