import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { connect } from "react-redux";
import { purple, white,red,green } from "../utils/color";
import { setLocalNotification, clearLocalNotification } from "../utils/helper";

class Quiz extends Component {
    state = {
        deck: null,
        numberOfQuestions: 0,
        currentMyQuestion: 0,
        correctAnswer: 0,
        incorrectAnswer: 0,
        showAnswer: false,
        opacity: new Animated.Value(0),
        width: new Animated.Value(0),
        height: new Animated.Value(0),
    }
    static navigationOptions = {
        title: 'Start Quiz',
    };

    componentDidUpdate(){
        const { currentMyQuestion, numberOfQuestions } = this.state
        if (currentMyQuestion > numberOfQuestions) {
            clearLocalNotification().then(setLocalNotification)
        }
    }

    componentDidMount() {
        const { decks, navigation } = this.props
        let deckId = navigation.getParam("deckId")
        let deck = decks[deckId]

        let numberOfQuestions = deck.questions.length
        this.setState({
            deck: deck,
            numberOfQuestions: numberOfQuestions,
            currentMyQuestion: numberOfQuestions === 0 ? 0 : 1,
        })
    }


    handleCorrectAnswer = () => {
        this.setState((prevState) => ({
            correctAnswer: prevState.correctAnswer + 1,
            currentMyQuestion: prevState.currentMyQuestion + 1,
            showAnswer: false,
            width: new Animated.Value(0),
            height: new Animated.Value(0)
        }))
    }

    handlingIncorrectAnswer = () => {
        this.setState((prevState) => ({
            correctAnswer: prevState.incorrectAnswer + 1,
            currentMyQuestion: prevState.currentMyQuestion + 1,
            showAnswer: false,
            width: new Animated.Value(0),
            height: new Animated.Value(0)
        }))
    }

    handleShowAnswer = () => {
        const { width, height } = this.state

        this.setState((prevState) => ({
            showAnswer: !prevState.showAnswer
        }),() => {
            Animated.spring(width, { toValue:380, speed:10, useNativeDriver: false })
            .start()
            Animated.spring(height, { toValue:100, speed:5, useNativeDriver: false })
            .start()
        })
    }

    onhandleRestartQuiz = () => this.setState({
        currentMyQuestion : 1,
        correctAnswer: 0,
        incorrectAnswer: 0
    })

    onHandleGoBack = () => this.props.navigation.goBack()
    calculateMarks= () => ((this.state.correctAnswer / this.state.numberOfQuestions) * 100).toFixed(2)

    render() {
        const { deck, numberOfQuestions, currentMyQuestion, showMeAnswer, width,height } = this.state
        let displayAll
        if(deck !== null) {
            displayAll = <View style={styles.container}>
                        {deck.questions.length === 0 &&
                            <Text style={styles.noCard}>Please add a card to take Quiz</Text>
                        }

                        {currentMyQuestion > numberOfQuestions &&
                            <View>
                                <Text style={styles.title}>Your marks {this.calculateMarks()}</Text>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={this.onhandleRestartQuiz}
                                >
                                <Text style={{color: white}}>Restart Quiz</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={this.onHandleGoBack}
                                >
                                <Text style={{color: white}}>Back</Text>
                                </TouchableOpacity>
                            </View>
                        }

                        {currentMyQuestion <= numberOfQuestions && numberOfQuestions !== 0 &&
                            <View>
                                <Text>{currentMyQuestion} / {numberOfQuestions}</Text>
                                {!showMeAnswer
                                    ? <Text style={styles.displayBox}>Question: {deck.questions[currentMyQuestion - 1].question}</Text>
                                    : <Animated.Text style={[styles.item,{width,height}]}>Answer: {deck.questions[currentMyQuestion - 1].answer}</Animated.Text>
                                }
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={this.handleShowAnswer}
                                >
                                <Text style={{color: white}}> Show Answer </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.button3}
                                    onPress={this.handleCorrectAnswer}
                                >
                                <Text style={{color: white}}>Correct</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.button2}
                                    onPress={this.handlingIncorrectAnswer}
                                >
                                <Text style={{color: white}}>Wrong</Text>
                                </TouchableOpacity>
                            </View>
                        }
                    </View>
                }

    return <View>{displayAll}</View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        padding: 10,
        marginTop: 10,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 20,
        padding: 40,
        borderWidth: 1,
        marginVertical: 4,
        marginHorizontal: 6,
        borderRadius: 2,
    },
    noCard: {
        fontSize: 20,
        padding: 40,
        width: 500
    },
    displayBox: {
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        marginVertical: 4,
        marginHorizontal: 6,
        borderRadius: 2,
        height: 100
    },
    button:{
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: green,
        borderRadius: 5,
        height: 40,
        marginVertical: 4
    },
    button2:{
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: red,
        borderRadius: 5,
        height: 40,
        marginVertical: 4
    },
    button3:{
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: green,
        borderRadius: 5,
        height: 40,
        marginVertical: 4
    }
  });

function mapStateToProps(decks) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(Quiz)
