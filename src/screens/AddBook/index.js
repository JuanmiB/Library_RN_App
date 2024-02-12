import React from "react";
import { SafeAreaView, View, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";
import GradientBg from "../../components/GradientBg";
import FormAddBook from "../../components/FormAddBook";
import { CurrentFormContext } from "../../context";
import Config from "react-native-config";
const AddBook = () => {
    const [form, setForm] = React.useState({
        title: "",
        author: "",
        lang: "",
        year: "",
        img: "",
        category: "",
        description: "",
        read: false,
    })
    const [isSuccess, setIsSuccess] = React.useState(null)

    const route = useRoute();
    const  id  = route?.params?.id
    const hasBook = id ? true : false
    const getBookById = async () => {
        try {
            const response = await fetch(`${Config.URL_API}${id}`)
            const data = await response.json()
            setForm(data.input)
        } catch (error) {
            console.log(error)
        }
    }
    React.useEffect(() => {
        if (id) {
            getBookById()
        }
    }, [])
    const showAlert = () => {
      if (isSuccess === true) {
          Alert.alert("Éxito", "El libro se ha subido correctamente", [{ text: "OK", onPress: () => setIsSuccess(null) }])
      } else if (isSuccess === false) {
          Alert.alert("Error", "Hubo un problema al subir el libro. Por favor, inténtalo de nuevo.", [{ text: "OK", onPress: () => setIsSuccess(null) }])
      }
  }
    const validateFields = () => {
        if (form.title === "") {
          alert('El campo titulo es requerido')
          return false
        }
        if (form.author === "") {
          alert('El campo autor es requerido')
          return false
        }
        if (form.category === "") {
          alert('El campo categoria es requerido')
          return false
        }
        if (form.lang === "") {
          alert('El campo lenguaje es requerido')
          return false
        }
        if (form.year === "") {
          alert('El campo año es requerido')
          return false
        }
        if (form.description === "") {
          alert('El campo descripcion es requerido')
          return false
        }
        setIsSuccess(true)
        setForm({})
        return true
  }
    const submitFormToAPI = async (formData) => {
        try {
          const response = await fetch(`${Config.URL_API}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ input: formData }),
          })
          if (!response.ok) {
            throw new Error('Error al enviar el formulario a la API');
          }
          const responseData = await response.json()
          return responseData
        } catch (error) {
          
          throw error
        }
      }

    const handleSubmit = async () => {
        if (validateFields() === false) {
          return
        } else {
          try {
            await submitFormToAPI(form)
          } catch (error) {
            throw error
          }
        }
      }

      const updateFromAPI = async (formData) => {
        try {
            const response = await fetch(`${Config.URL_API}${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ input: formData }),
            });
            if (!response.ok) {
                throw new Error('Error al enviar el formulario a la API')
            }
            const responseData = await response.text();
            if (!responseData) {
                throw new Error('La respuesta de la API está vacía')
            }
            return JSON.parse(responseData)
        } catch (error) {
            throw error
        }
    }
    
      const handleUpdateBook = async () => {
        if (validateFields() === false) {
            return
        } else {
            try {
                await updateFromAPI(form)
            } catch (error) {
                console.error("Error al actualizar el libro:", error)
                alert("Hubo un error al actualizar el libro. Por favor, inténtalo de nuevo.")
            }
        }
    };
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <GradientBg>
            <View>
                <CurrentFormContext.Provider value={{form,setForm}} >
                    <FormAddBook submitBook={handleSubmit} updateBook={handleUpdateBook} hasBook={hasBook}/>
                    {showAlert()}
                </CurrentFormContext.Provider>
            </View>
        </GradientBg>
      </SafeAreaView>
    )
}
export default AddBook