import React from 'react';
import { LogBox, Text, View, StyleSheet, Button } from 'react-native';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports'
import { Authenticator, ConfirmSignIn } from 'aws-amplify-react-native';

import SignIn from './components/SignIn'
import SignUp from './components/SignUp';
import ConfirmSignUp from './components/ConfirmSignUp';
import ForgotPassword from './components/ForgotPassword';
import ChangePassword from './components/ChangePassword'


LogBox.ignoreAllLogs()

Amplify.configure(awsconfig)


function Home(props) {
  return (
    <View>
      <Text>
        Welcome
      </Text>
      <Button title="Sign Out" onPress={()=> Auth.signOut()} />
    </View>
  );
}

const AuthScreens = (props) => {
  console.log('props',props.authState);
  switch (props.authState) {
    case 'signIn':
      return <SignIn {...props} />;
    case 'signUp':
      return <SignUp {...props} />;
    case 'forgotPassword':
      return <ForgotPassword {...props} />;
    case 'confirmSignUp':
      return <ConfirmSignUp {...props} />;
    case 'changePassword':
      return <ChangePassword {...props} />;
    case 'signedIn':
      return <Home {...props} />;
  }
};

const App = () => {

  return (
    <View style={styles.container}>
      <Authenticator
        usernameAttributes="email"
        authState="signIn"
        hideDefault={true}
      >
        <AuthScreens />
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

export default App