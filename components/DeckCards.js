import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { green } from "../utils/color";

const handleDeck = (props) => {
    props.navigator.push("DisplayDeck", { deckId: props.id, deckTitle: props.deck.title })
}

function DeckCard(props) {
    const { deck } = props
    return <View> 
    <TouchableOpacity style = { styles.deckFormat }
    onPress = {
            () => handleDeck(props)
        }>
        <Text style = { styles.titleOfDeck } > { deck.titleOfDeck } </Text> 
        <Text> { deck.questions.length }
    Cards) 
    </Text> 
    </TouchableOpacity>
</View>
}

const styles = StyleSheet.create({
    titleOfDeck: {
        fontSize: 25,
    },
    deckFormat: {
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        marginVertical: 4,
        marginHorizontal: 6,
        borderRadius: 2,
        borderColor: green
    }
})

function mapState(decks, { id }) {
    return {
        deck: decks[id]
    }
}
export default connect(mapState)(DeckCard)