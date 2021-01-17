import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import {Auth} from 'aws-amplify';

import {validateEmail} from '../Validation';

import {FormStyles} from './styles/FormStyles';

export default function ForgotPassword(props) {
  const [state, setState] = useState({
    email: '',
  });

  const [error, setErrors] = useState({email: ''});

  async function onSubmit() {
    const emailError = validateEmail(state.email);

    if (emailError) setErrors({email: emailError});
    else {
      try {
        const user = await Auth.forgotPassword({
          username: state.email,
        });
        props.onStateChange('ChangePassword', {});
      } catch (error) {
        Alert.alert(error.message);
      }
    }
  }
  if (props.authState === 'forgotPassword')
    return (
      <View style={FormStyles.container}>
        <Text style={FormStyles.title}>Forgot Password</Text>
        <Text style={FormStyles.label}>Email</Text>
        <TextInput
          style={FormStyles.input}
          onChangeText={(text) =>
            setState({...state, email: text.toLowerCase()})
          }
          value={state.email}
          placeholder="Enter email"
        />
        <Text style={FormStyles.error}>{error.email}</Text>

        <Text style={FormStyles.error}>{error.password}</Text>
        <TouchableOpacity style={FormStyles.button} onPress={() => onSubmit()}>
          <Text style={FormStyles.buttonText}>Retrieve Password</Text>
        </TouchableOpacity>

        <View style={FormStyles.links}>
          <Button
            onPress={() => props.onStateChange('signIn', {})}
            title="Back to Sign In"
            color="black"
            accessibilityLabel="back to signIn"
          />
          <Button
            onPress={() => props.onStateChange('changePassword', {})}
            title="Change Password"
            color="black"
            accessibilityLabel="Change Password "
          />
        </View>
      </View>
    );
  else return <></>;
}
