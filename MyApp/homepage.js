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
import {Navigation} from 'react-native-navigation';

import {color} from 'react-native-reanimated';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Loader from './loader';
import {appbuttons} from './appthemes/styles';

export default class Homescreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: 'newAcc11@hotmail.com',
      password: 'Admin@123',
      loading: false,
    };
  }

  postCallResponse = async () => {
    //Setting Loading flag to true to show indicator
    this.setState({
      loading: true,
    });

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
    try {
      var serviceResult = await axios(config);
      // .then(function (response) {
      //   console.log('*****************Status Code****************');
      //   console.log(response.status);
      //   console.log('******************************************');
      //   console.log(JSON.stringify(response.data));
      //   alert('Api Call success');
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });

      var st = serviceResult.status;
      console.log('****ST*********');
      console.log(st);
      if (st == 200) {
        alert('Success');
        this.props.navigation.navigate('Profile', {name: 'Jane'});
      } else alert('Invalid username or password');
    } catch (e) {
      alert('Something went wrong:' + e);
      return {};
    } finally {
      // Setting Loading flag to false to hide indicator
      // setTimeout(() => {
      //   this.setState({
      //     loading: false,
      //   });
      // }, 2500);

      // Setting Loading flag to false to hide indicator
      this.setState({
        loading: false,
      });
    }
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

  async OnRegisterLabelPressed() {
    this.props.navigation.navigate('Register', {USER_ID: 100});
  }

  async OnButtonPressed() {
    var uName = this.state.userName;
    var uPass = this.state.password;

    console.log('UN:' + this.state.userName);
    console.log('PWD:' + this.state.password);

    console.log('On Button Pressed Hit');

    this.postCallResponse();
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
        <Loader loading={this.state.loading} />
        {/* <Image source={require('./icons/headerPanel.png')} style={style.imageStyle}/> */}
        <View style={style.subcontainer}>
          <Text style={style.labelStyle}>User name</Text>
          <TextInput
            value={this.state.userName}
            onChangeText={(text) => this.setState({userName: text})}
            style={style.entryStyle}
            placeholder="User name"
          />
          <Text style={style.labelStyle}>Password</Text>
          <TextInput
            value={this.state.password}
            onChangeText={(text) => this.setState({password: text})}
            secureTextEntry={true}
            style={style.entryStyle}
            placeholder="Password"
          />
          <TouchableOpacity
            style={appbuttons.redbutton}
            onPress={async () => await this.OnButtonPressed()}
            underlayColor="#fff">
            <Text style={style.textButtonStyle}>Login</Text>
          </TouchableOpacity>
          <Text
            style={style.newuserLabelStyle}
            onPress={async () => await this.OnRegisterLabelPressed()}>
            New User ? Register Here
          </Text>
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
    justifyContent: 'center',
    marginTop: -50,
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

  newuserLabelStyle: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

//export default HomeScreen;
