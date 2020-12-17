import {StyleSheet, Button, View, Text, Touchable} from 'react-native';
import React, {Component} from 'react';
import {Navigation} from 'react-native-navigation';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import qs from 'qs';
import axios from 'axios';

export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FullName: '',
      Email: '',
      Password: '',
      ConfirmPassword: '',
    };
  }
  async OnRegisterPressed() {
    //ApiCall here
    console.log('****************************');
    console.log('************FullName:' + this.state.FullName);
    console.log('************Email:' + this.state.Email);
    console.log('************Password:' + this.state.Password);
    console.log('************ConfirmPassword:' + this.state.ConfirmPassword);
    var data = qs.stringify({
      FullName: this.state.FullName,
      Email: this.state.Email,
      Password: this.state.Password,
      ConfirmPassword: this.state.ConfirmPassword,
    });
    var config = {
      method: 'post',
      url: 'https://amneen-test.azurewebsites.net/api/account/register',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: data,
    };

    await axios(config)
      .then((res) => {
        console.log('reponse :', res);
        if (res.status == 200) this.props.navigation.goBack();
      })
      .catch((error) => {
        console.error(error.response.data);
        var errorResponse = error.response.data;
        if (errorResponse.Status == 'fail') alert(errorResponse.Message);
        return {name: 'network error', description: ''};
      });

    //try {
    //var registerResult = await axios(config);
    //   res = registerResult;
    //   console.log('***************Json Response***********');
    //   console.log(registerResult.data);
    // } catch (error) {
    //   alert(error);
    //   alert(res);
    // }

    alert(this.state.FullName);
  }

  render() {
    const user_id = this.props.route.params;

    return (
      <View style={style.mainContainer}>
        <Text>User Name: {JSON.stringify(user_id.USER_ID)}</Text>
        <Text>Name</Text>
        <TextInput
          style={style.entryStyle}
          onChangeText={(text) => this.setState({FullName: text})}
        />
        <Text>Email</Text>
        <TextInput
          style={style.entryStyle}
          onChangeText={(text) => this.setState({Email: text})}
        />
        <Text>Password</Text>
        <TextInput
          style={style.entryStyle}
          onChangeText={(text) => this.setState({Password: text})}
        />
        <Text>Confirm Password</Text>
        <TextInput
          style={style.entryStyle}
          onChangeText={(text) => this.setState({ConfirmPassword: text})}
        />
        <TouchableOpacity
          style={style.buttonStyle}
          onPress={async () => await this.OnRegisterPressed()}>
          <Text style={style.buttonTextStyle}>Register</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginLeft: 10,
    marginRight: 10,
  },
  entryStyle: {
    paddingStart: 5,
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 0.5,
  },
  buttonStyle: {
    backgroundColor: 'gray',
    borderRadius: 5,
  },
  buttonTextStyle: {
    textAlign: 'center',
  },
});
