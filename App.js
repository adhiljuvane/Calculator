/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { DrawerNavigation } from 'react-navigation';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      resultText: "",
      calculationText: ""
    }
  }

  calculateResult() {
    const text = this.state.resultText;
    // console.log(text, eval(text));
    this.setState({
      calculationText: eval(text),
      resultText: eval(text).toString()
    })
  }

  validate() {
    const text = this.state.resultText;
    switch (text.slice(-1)) {
      case '+':
      case '-':
      case '/':
      case '*':
        return false
    }
    return true
  }

  buttonPressed(text) {
    // console.log(text, "text")
    if (text == "=") {
      return this.validate() && this.calculateResult();
    }
    this.setState({
      resultText: this.state.resultText + text
    })
  }

  operate(operation) {
    switch (operation) {
      case 'D':
        if (this.state.resultText == "") {
          return
        }
        console.log("dd");
        let text = this.state.resultText.split('');
        text.pop()
        this.setState({
          resultText: text.join('')
        })
        break;
      case '+':
      case '-':
      case '/':
      case '*':
        console.log(this.state.resultText, "75")
        const lastChar = this.state.resultText.split('').pop()
        let operations = ['D', '+', '-', '*', '/'];
        if (operations.indexOf(lastChar) > 0) return
        if (this.state.resultText == "") {
          return
        }
        this.setState({
          resultText: this.state.resultText + operation
        })
    }
  }

  render() {
    let rows = [];
    let nums = [[1, 2, 3], [4, 5, 6], [7, 8, 9], ['.', 0, '=']];
    for (i = 0; i < 4; i++) {
      let row = []
      for (j = 0; j < 3; j++) {
        let k = nums[i][j];
        row.push(<TouchableOpacity key={k} onPress={() => this.buttonPressed(k)} style={styles.button}>
          <Text style={styles.digit}>{nums[i][j]}</Text>
        </TouchableOpacity>)
      }
      rows.push(<View key={nums[i]} style={styles.row}>{row}</View>)
    }

    let operations = ['D', '+', '-', '*', '/'];
    let ops = [];
    for (i = 0; i < 5; i++) {
      let k = operations[i]
      ops.push(<TouchableOpacity key={k} onPress={() => this.operate(k)} style={styles.button}>
        <Text style={styles.digit}>{operations[i]}</Text>
      </TouchableOpacity>
      )
    }

    return (
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={styles.resultText}>{this.state.resultText}</Text>
        </View>
        <View style={styles.calculation}>
          <Text style={styles.calculationText}>{this.state.calculationText}</Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.numbers}>
            {rows}
          </View>
          <View style={styles.operations}>
            {ops}
          </View>
          <View styles={styles.overlay}>
            {rows}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  result: {
    flex: 2,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  resultText: {
    fontSize: 30,
    color: 'black',
    paddingRight: 5,
  },
  calculation: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  calculationText: {
    fontSize: 35,
    color: 'black',
    paddingRight: 5,
  },
  buttons: {
    flex: 5,
    flexDirection: 'row',
    margin: 0,
    paddingBottom: 0,
    alignSelf: 'flex-end',
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    right: 0,
    opacity: 0.5,
    backgroundColor: 'blue',
    width: SCREEN_WIDTH,
  },
  button: {
    flex: 1,
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  numbers: {
    flex: 3,
    backgroundColor: '#434343',
    flexDirection: 'column',
    color: 'white'
  },
  operations: {
    flex: 1,
    backgroundColor: '#636363',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'column',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  digit: {
    fontSize: 30,
    color: 'white'
  }
});
