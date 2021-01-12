import React from 'react';
import { LogBox, Text, View, StyleSheet } from 'react-native';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports'
import { Authenticator, SignIn, ConfirmSignUp, ConfirmSignIn, ForgotPassword } from 'aws-amplify-react-native';

import SignUp from './SignUp'


LogBox.ignoreAllLogs()

Amplify.configure(awsconfig)


function Home(props) {
  if (props.authState === 'signedIn') return <Text>Welcome</Text>;
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