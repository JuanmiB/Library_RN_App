import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome5";
import Home from "../screens/Home/index";
import BookDetails from "../screens/BookDetails/index";
import BookSeccion from "../screens/BookSeccion/index";
import AddBook from "../screens/AddBook/index";
const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const BookSeccionStack = () => {
    return (
            <Stack.Navigator
            initialRouteName={BookSeccion}
            screenOptions={{
                headerShown: false
            }}
            >
                <Stack.Screen name="BookSeccion" component={BookSeccion} />
                <Stack.Screen name="BookDetails" component={BookDetails} />
                <Stack.Screen name="AddBook" component={AddBook} />
            </Stack.Navigator>
       
    )
}

export const TabNavigator = () => {
    return (
        <Tab.Navigator
        screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "black",
            tabBarInactiveTintColor: "gray",
            tabBarHideOnKeyboard: true

    
        }}
        >
            <Tab.Screen 
            name="Home" 
            component={Home}
            options={{
                tabBarLabel: "Home",
                tabBarIcon: ({ color }) => (
                    <Icon name="home" color={color} size={26} />
                )
            }}
            
            />
            <Tab.Screen name="BookSeccionStack" component={BookSeccionStack}
             options={{
                tabBarLabel: "Book",
                tabBarIcon: ({ color }) => (
                    <Icon name="book" color={color} size={26} />
                )
            }}
            />
        </Tab.Navigator>
    )
}