import React, {useState} from 'react'
import { View, Text, Button, TextInput, TouchableOpacity, Alert } from 'react-native'
import{ Auth } from 'aws-amplify';

import { validateEmail, validatePassword } from '../Validation';

import {FormStyles} from "./styles/FormStyles"


export default function SignIn(props) {
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const [error, setErrors] = useState({ email: '', password: '' })
  
  async function onSubmit() {
    const emailError = validateEmail(state.email);
    const passwordError = validatePassword(state.password);
    if (emailError || passwordError)
      setErrors({ email: emailError, password: passwordError });
    else {
      try {
        const user = await Auth.signIn({
          username: state.email,
          password: state.password
        });
        props.onStateChange('confirmSignUp', user)
      } catch (error) {
        Alert.alert(error.message);
      }
    }
  }
  if(props.authState === 'signIn')
    return (
      <View style={FormStyles.container}>
        <Text style={FormStyles.title}>Sign In</Text>
        <Text style={FormStyles.label}>Email</Text>
        <TextInput
          style={FormStyles.input}
          onChangeText={(text) => setState({...state, email: text.toLowerCase()})}
          value={state.email}
          placeholder="Enter email"
        />
        <Text style={FormStyles.error}>{error.email}</Text>
        <Text style={FormStyles.label}>Password</Text>
        <TextInput
          style={FormStyles.input}
          onChangeText={(text) => setState({...state, password: text})}
          value={state.password}
          secureTextEntry={true}
          placeholder="Enter password"
        />
        <Text style={FormStyles.error}>{error.password}</Text>
        <TouchableOpacity style={FormStyles.button} onPress={() => onSubmit()}>
          <Text style={FormStyles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <View style={FormStyles.links}>
          <Button
            onPress={() => props.onStateChange('signUp', {})}
            title="Back to Sign Up"
            color="black"
            accessibilityLabel="back to signUp"
          />
          <Button
            onPress={() => props.onStateChange('forgotPassword', {})}
            title="Forgot Password"
            color="black"
            accessibilityLabel="Forgot Password "
          />
        </View>
      </View>
    );
    else return <></>
}

