// Homescreen.js
import axios from 'axios';
import qs from 'qs';
import React, {Component} from 'react';
import {
  StyleSheet,
  Button,
  View,
  Image,
  Text,
  Touchable,
  Platform,
} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
// import TextInputWithValidation from 'react-native-input-validator';

import {color} from 'react-native-reanimated';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default class Homescreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
    };
  }

  postCallResponse = () => {
    console.log('***********************************************');
    console.log('UN:' + this.state.userName);
    console.log('PWD:' + this.state.password);
    var data = qs.stringify({
      grant_type: 'password',
      username: this.state.userName,
      password: this.state.password,
    });
    var config = {
      method: 'post',
      url: 'https://amneen-test.azurewebsites.net/Token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: data,
    };

    var serviceResult = axios(config)
      .then(function (response) {
        console.log('*****************Status Code****************');
        console.log(response.status);
        console.log('******************************************');
        console.log(JSON.stringify(response.data));
        alert('Api Call success');
      })
      .catch(function (error) {
        console.log(error);
      });

    // var st = serviceResult.response.status;
    // console.log('****ST*********');
    // console.log(st);
    // if (st > 200) alert('Success');
    // else alert('Invalid username or password');

    // fetch('https://amneen-test.azurewebsites.net/Token', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     grant_type: 'password',
    //     username: this.state.userName,
    //     password: this.state.password,
    //   })
    //     .then((response) => response.json())
    //     .then((response) => {
    //       //console.log(response.content);
    //       console.log(response);
    //     }),
    // }).catch(function (error) {
    //   console.log(error);
    // });
  };

  async OnButtonPressed() {
    var uName = this.state.userName;
    var uPass = this.state.password;

    console.log('UN:' + this.state.userName);
    console.log('PWD:' + this.state.password);

    console.log('On Button Pressed Hit');

    this.postCallResponse();
    //var res1=await checkIfUserNameIsValid();
    //let responseJson=await response.json();
    //console.log('Response json : '+responseJson)
    //return responseJson;

    // if (uName.trim() == 'Nouf' && uPass.trim() == 'Password1') {
    //   this.props.navigation.navigate('Profile', {name: 'Jane'});
    // } else alert('Invalid username or password');
  }

  async checkIfUserNameIsValid() {
    const response = await fetch('https://reqres.in/api/users?page=2');
    const responseJson = await response.json();
    console.log('Nouf' + responseJson);
    return responseJson;

    // let response=await fetch('https://amneen-test.azurewebsites.net/Token',
    // {
    //   method:'POST',
    //   headers:{
    //           Accept: 'application/json',
    //           'Content-Type': 'application/json'
    //         },
    //   body:JSON.stringify(
    //     {
    //       grant_type:'password',
    //       username:un,
    //       password:pass
    //     }
    //   )
    // }).catch(function (error) {
    // });

    //let responseJson=await response.json();
    //return responseJson;
  }

  //}

  //const HomeScreen = ({navigation}) => {
  render() {
    return (
      <View style={style.container}>
        {/* <Image source={require('./icons/headerPanel.png')} style={style.imageStyle}/> */}
        <View style={style.subcontainer}>
          <Text style={style.labelStyle}>User name</Text>
          {/* <TextInputWithValidation
        onRef={(r) => {
            this.input = r;
          }} type='email'
        onChangeText={(text) => 
          {this.setState({value: text})}}
          style={style.input} 
          placeholder="User Name">
          <Text>Default</Text>
      </TextInputWithValidation> */}
          <TextInput
            text="newAcc11@hotmail.com"
            onChangeText={(text) => this.setState({userName: text})}
            style={style.entryStyle}
            placeholder="User name"
          />
          <Text style={style.labelStyle}>Password</Text>
          <TextInput
            text="Admin@123"
            onChangeText={(text) => this.setState({password: text})}
            secureTextEntry={true}
            style={style.entryStyle}
            placeholder="Password"
          />
          {/* <Button
        title="Login"
        onPress={() => navigation.navigate('Profile', {name: 'Jane'})}/> */}
          <TouchableOpacity
            style={style.buttonStyle}
            onPress={async () => await this.OnButtonPressed()}
            underlayColor="#fff">
            <Text style={style.textButtonStyle}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  subcontainer: {
    flex: 1,
    marginTop: 50,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'white',
  },
  labelStyle: {
    marginBottom: 10,
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 20,
  },

  entryStyle: {
    marginBottom: 10,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
  },

  buttonStyle: {
    marginRight: 0,
    marginLeft: 0,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#1E6738',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },

  textButtonStyle: {
    color: '#fff',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },

  imageStyle: {
    height: 180,
  },
});

//export default HomeScreen;
