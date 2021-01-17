import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Auth} from 'aws-amplify';

import {validateEmail, validatePassword} from '../Validation';

import {FormStyles} from './styles/FormStyles';

export default function ChangePassword(props) {
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const [error, setErrors] = useState({email: '', password: ''});

  async function onSubmit() {
    const emailError = validateEmail(state.email);
    const passwordError = validatePassword(state.password);
    if (emailError || passwordError)
      setErrors({email: emailError, password: passwordError});
    else {
      try {
        const user = await Auth.changePassword({
          username: state.email,
          password: state.password,
        });
        props.onStateChange('signIn');
      } catch (error) {
        Alert.alert(error.message);
      }
    }
  }
  if (props.authState === 'changePassword')
    return (
      <View style={FormStyles.container}>
        <Text style={FormStyles.title}>Change Password</Text>

        <Text style={FormStyles.error}>{error.email}</Text>
        <Text style={FormStyles.label}>Password</Text>
        <TextInput
          style={FormStyles.input}
          onChangeText={(text) => setState({...state, password: text})}
          value={state.password}
          secureTextEntry={true}
          placeholder="Enter a new password"
        />
        <Text style={FormStyles.error}>{error.password}</Text>
        <TouchableOpacity style={FormStyles.button} onPress={() => onSubmit()}>
          <Text style={FormStyles.buttonText}>Change Password</Text>
        </TouchableOpacity>

        <View style={FormStyles.links}>
          <Button
            onPress={() => props.onStateChange('forgotPassword', {})}
            title="Back to Forgot Password"
            color="black"
            accessibilityLabel="back to forgot Password"
          />
          <Button
            onPress={() => props.onStateChange('signIn', {})}
            title="Sign In"
            color="black"
            accessibilityLabel="go to sign in "
          />
        </View>
      </View>
    );
  else return <></>;
}
