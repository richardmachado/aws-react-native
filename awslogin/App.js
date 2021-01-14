import React from 'react';
import { LogBox, Text, View, StyleSheet, Button } from 'react-native';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports'
import { Authenticator, ConfirmSignIn } from 'aws-amplify-react-native';

import SignIn from './components/SignIn'
import SignUp from './components/SignUp';
import ConfirmSignUp from './components/ConfirmSignUp';
import ForgotPassword from './components/ForgotPassword';


LogBox.ignoreAllLogs()

Amplify.configure(awsconfig)


function Home(props) {
  if (props.authState === 'signedIn') return (
    <View>
      <Text>
        Welcome
      </Text>
      <Button title="Sign Out" onPress={()=> Auth.signOut()} />
    </View>
  );
  else return <Text></Text>
}
export default function App() {

  return (
    <View style={styles.container}>
      <Authenticator usernameAttributes="email"
        authState="signIn"
        hideDefault={true} onStateChange={(authState) => console.log('authSTATE ...', authState)}>
        <Home />
        <SignUp />
        <SignIn />
        <ConfirmSignUp />
        <ConfirmSignIn />
        <ForgotPassword />
        </Authenticator>
    </View>
  )
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
  },
})