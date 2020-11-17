import React, { Component } from 'react'
import { createStore } from "redux"
import { Provider } from "react-redux"
import reducer from "./redux/reducers"
import { createAppContainer, } from "react-navigation"
import { createBottomTabNavigator } from "react-navigation-tabs"
import { createStackNavigator } from "react-navigation-stack"
import myMiddleware from "./redux/middleware"
import { getDecks, addDeck } from "./redux/actions"
import * as api from "./utils/api"
import examData from './utils/Data'
import { FontAwesome5, Entypo } from "@expo/vector-icons"
import { green } from './utils/color'
import { setLocalNotification } from "./utils/helper"
import ListAllDecks from "./components/ListDecks"
import DisplayAllDecks from "./components/ShowDecks"
import CreateNewCards from './components/CreateCards'
import AddDecks from './components/AddDecks'
import Quiz from "./components/Quiz"

const store = createStore(reducer, myMiddleware)

const myTabs = createBottomTabNavigator({
    Home: {
        screen: ListAllDecks,
        navigationOptions: {
            tabBarIcon: () => < FontAwesome5 name = "list"
            size = { 30 }
            color = { green }
            />
        }
    },
    AddDeck: {
        screen: AddDecks,
        navigationOptions: {
            tabBarIcon: () => < Entypo name = "add-to-list"
            size = { 30 }
            color = { green }
            />
        }
    }
}, {
    tabBarOptions: {
        activeTintColor: green,
        style: {
            height: 56,
            shadowColor: 'rgb (0, 0, 0, 0.24)'
        }
    }
})

const myStack = createStackNavigator({
    Home: {
        screen: myTabs
    },
    DisplayDeck: {
        screen: DisplayAllDecks
    },
    CreateCard: {
        screen: CreateNewCards,
        tabBarOptions: {
            title: 'Add new Card'
        }
    },
    Quiz: {
        screen: Quiz,
        tabBarOptions: {
            title: 'Take quiz'
        }
    }
})

const Home = createAppContainer(myStack)

export default class App extends Component {

    componentDidMount() {
        api.__getDecks().then(result => {
            if (result === null) {
                const key = Date.now
                Object.values(examData).map((deck) => {
                    store.dispatch(addDeck(deck, key))
                    api.__AddDeck(deck, key)
                })
            }
            store.dispatch(getDecks(result))
        })
        setLocalNotification()
    }

    render() {

        return ( <Provider store = { store }>
            <Home/>
            </Provider>
        );
    }
}