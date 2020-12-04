import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, View, StyleSheet, FlatList } from "react-native";
import DeckOurCard from "./DeckCards";

class ListDecks extends Component {

    static navigationOptions = {
        title: 'Decks',
        
    };

    render() {
        const { deckId, navigation } = this.props
        return <View style = { styles.container } > 
        <FlatList data = { deckId }
        renderItem = {
            ({ item }) => ( <
                DeckOurCard id = { item }
                navigator = { navigation }
                />
            )
        }
        keyExtractor = { item => item }/>   
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10
    }
});

function mapState(decks) {

    return {
        deckId: Object.keys(decks)
    }
}
export default connect(mapState)(ListDecks)