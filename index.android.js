/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  TouchableHighlight
} from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Text } from 'native-base';
import { Image, NativeModules } from 'react-native';
import Camera from 'react-native-camera';

export default class BearMinPhone extends Component {
  constructor(props){
    super(props);
    this.state = {
      path: null,
      rgbvals: 'red: green: blue:'
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[capture]</Text>
        </Camera>

        <Image source={{uri: this.state.path}} style={{ flex: 1}} />
        <CardExample text={this.state.rgbvals}> </CardExample>
      </View>
    );
  }

  takePicture() {
   const options = {};
   //options.location = ...
   this.camera.capture({metadata: options})
     .then((data) => {console.log(data);
           this.setState({path: data.path})})
     .catch(err => console.error(err));
 }

 NativeModules.Bitmap.getPixels(this.state.rgbvals)
   .then((image) => {
     console.log(image.width);
     console.log(image.height);
     console.log(image.hasAlpha);


     rgbval = 'red: ' + image.R + ' green: ' + image.G + ' blue: ' + image.B;
     this.setState({rgbvals: rgbval});
     }
   })
   .catch((err) => {
     console.error(err);
   });

}
class CardExample extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Card>
            <CardItem>
              <Body>
                <Text>
                   {this.props.text}
                </Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  },welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    }
});

AppRegistry.registerComponent('BearMinPhone', () => BearMinPhone);
