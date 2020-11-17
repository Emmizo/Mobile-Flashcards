import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { addQuetionToDeck } from "../redux/actions";
import { setLocalNotification, clearLocalNotification } from "../utils/helper";
import { __AddCardToDeck } from "../utils/api";
import { white, purple,green } from "../utils/color";

class AddCard extends Component {
    state = {
        answer: '',
        question: '',
        disableButton: true,
    }

    handleAnswer = (input) => this.setState({ answer: input.toLowerCase() })
    handleQuestion = (input) => this.setState({ question: input })

    CreateCard = () => {
        const { question, answer } = this.state
        const { navigation, dispatch } = this.props
        const deckId = this.props.navigation.getParam('deckId')
        dispatch(addQuetionToDeck({ question, answer }, deckId))
        __AddCardToDeck({ question, answer }, deckId)

        clearLocalNotification()
            .then(setLocalNotification)

        navigation.navigate("DisplayDeck", deckId)
    }

    render() {
        const { answers, question } = this.state

        return <View style = { styles.containing }>
            <TextInput
        style = { styles.inputField }
        placeholder = "Questions"
        value = { question }
        onChangeText = { this.handleQuestion }/> 
        <TextInput
        style = { styles.inputField }
        placeholder = "Answers"
        value = { answers }
        onChangeText = { this.handleAnswer }
        /> 
        <TouchableOpacity
        style = { styles.AllButton }
        onPress = { this.CreateCard }
        disabled = { answers === '' || question === '' ? true : false } >
            <Text style = {
                { color: white }
            } > Create Card </Text>  
            </TouchableOpacity>
             </View>
    }
}


const styles = StyleSheet.create({
    containing: {
        flex: 1,
        marginTop: 20,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    inputField: {
        height: 45,
        marginVertical: 5,
        padding: 5,
        borderWidth: 1,
        borderColor: green,
        borderRadius: 2,
    },
    AllButton: {
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: green,
        borderRadius: 5,
        height: 40
    }
})

export default connect()(AddCard)