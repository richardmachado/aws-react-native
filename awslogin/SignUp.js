import React, {useState} from 'react'
import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import{ Auth } from 'aws-amplify';
import { validateEmail, validatePassword } from './Validation';

const windowWidth = Dimensions.get('window').width

export default function SignUp(props) {
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
        const user = await Auth.signUp({
          username: state.email,
          password: state.password
        });
      } catch (error) {
        Alert.alert(error.message);
      }
    }
  }
  if(props.authState === 'signUp')
    return (
      <View style={styles.container}>
        <Text style={styles.title}>SignUp</Text>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setState({...state, email: text.toLowerCase()})}
          value={state.email}
          placeholder="Enter email"
        />
        <Text style={styles.error}>{error.email}</Text>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setState({...state, password: text})}
          value={state.password}
          placeholder="Enter password"
        />
        <Text style={styles.error}>{error.password}</Text>
        <TouchableOpacity style={styles.button} onPress={() => onSubmit()}>
          <Text style={styles.buttonText}>Press Here</Text>
        </TouchableOpacity>

        <View style={styles.links}>
          <Button
            onPress={() => props.onStateChange('signIn', {})}
            title="Back to Sign In"
            color="black"
            accessibilityLabel="back to signIn"
          />
          <Button
            onPress={() => props.onStateChange('confirmSignUp', {})}
            title="confirm a code"
            color="black"
            accessibilityLabel="back to "
          />
        </View>
      </View>
    );
    else return <></>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    width: windowWidth,
    padding:20 
  },
  button: {
    backgroundColor: "lightseagreen",
    height: 40,
    borderRadius: 5,
    justifyContent:'center',
  },
  buttonText: {
    textTransform: 'uppercase',
    color: 'white',
    textAlign:'center',
  },
  input: {
    height: 40,
    borderColor: 'lightgray',
    borderWidth: 1, 
    width: windowWidth - 60,
    borderRadius:5,
    marginBottom: 5,
    padding: 10,

  },
  links: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: '600'
  },
  label: {
    marginLeft: 5,
    marginBottom: 5

  },
  error: {
    color: "red",
    paddingBottom: 10,
    marginLeft: 5,
  }
})