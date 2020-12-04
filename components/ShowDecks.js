import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { purple, white,green } from "../utils/color";
import { setNotification, clearNotification } from "../utils/helper";

class ShowDeck extends Component {

    static navigationOptions({ navigation }) {
        return {
            title: navigation.state.params.deckTitle
        }
    }
    handleAddCard = (deckId) => {
        this.props.navigation.push("CreateCard", { deckId: deckId })
    }
    handleTakeQuiz = (deckId) => {
        this.props.navigation.push("Quiz", { deckId: deckId })

        clearNotification()
            .then(setNotification)
    }

    render() {
        const deckId = this.props.navigation.getParam('deckId');
        const deck = this.props.decks[deckId]
        return <View style = { styles.container } >
            <View style = { styles.deck } >
            <Text style = { styles.title } > { deck.title } </Text> 
             <Text> { deck.questions.length }
        Card(s) </Text> 
         </View> 
         <TouchableOpacity
        style = { styles.button }
        onPress = {
                () => this.handleAddCard(deckId)
            }>
            <Text style = {
                { color: white }
            } > Add card </Text>  
            </TouchableOpacity>

            <TouchableOpacity
        style = { styles.button }
        onPress = {
                () => this.handleTakeQuiz(deckId)
            } >
            <Text style = {
                { color: white }
            }> Take quiz </Text>
             </TouchableOpacity>
              </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
    },
    title: {
        fontSize: 20
    },
    deck: {
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor:green,
        marginVertical: 4,
        marginHorizontal: 6,
        borderRadius: 2
    },
    button: {
        marginVertical: 4,
        marginHorizontal: 6,
        backgroundColor: green,
        padding: 5,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        height: 40
    }
});


function mapState(decks) {
    return {
        decks
    }
}
export default connect(mapState)(ShowDeck)