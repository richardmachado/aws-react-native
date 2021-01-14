import React, {useState} from 'react'
import { View, Text, Button, TextInput, TouchableOpacity, Alert } from 'react-native'
import{ Auth } from 'aws-amplify';

import { validateEmail } from '../Validation';

import {FormStyles} from "./styles/FormStyles"


export default function ConfirmSignUp(props) {
  const [state, setState] = useState({
    email: '',
    confirmationCode: '',
  });

  const [error, setErrors] = useState({ email: ''})
  
  async function onSubmit() {
    const { email: username, confirmationCode: code } = state;
    const emailError = validateEmail(state.email);
    if (emailError) setErrors({ email: emailError});
    else {
      try {
        const user = await Auth.confirmSignUp(username, code);
        setState({confirmationCode:''})
        props.onStateChange('signIn')
      } catch (error) {
        Alert.alert(error.message);
      }
    }
  }
  if(props.authState === 'confirmSignUp')
    return (
      <View style={FormStyles.container}>
        <Text style={FormStyles.title}>Confirm SignUp</Text>
        <Text style={FormStyles.label}>Email</Text>
        <TextInput
          style={FormStyles.input}
          onChangeText={(text) => setState({...state, email: text.toLowerCase()})}
          value={state.email}
          placeholder="Enter email"
        />
        <Text style={FormStyles.error}>{error.email}</Text>
        <Text style={FormStyles.label}>Confirmation Code</Text>
        <TextInput
          style={FormStyles.input}
          onChangeText={(text) => setState({...state, confirmationCode: text})}
          value={state.confirmationCode}
          placeholder="Enter Confirmation Code"
        />
        <TouchableOpacity style={FormStyles.button} onPress={() => onSubmit()}>
          <Text style={FormStyles.buttonText}>Confirm Sign Up</Text>
        </TouchableOpacity>

        <View style={FormStyles.links}>
          <Button
            onPress={() => props.onStateChange('signIn', {})}
            title="Back to Sign In"
            color="black"
            accessibilityLabel="back to signIn"
          />
          <Button
            onPress={() => props.onStateChange('signUp', {})}
            title="back to sign up"
            color="black"
            accessibilityLabel="back to SignUp"
          />
        </View>
      </View>
    );
    else return <></>
}

