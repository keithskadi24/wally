import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, View, Text } from 'react-native';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';

const Stack = createNativeStackNavigator();

export default function Routes() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isPressedSignIn, setIsPressedSignIn] = useState(false);
  const [isPressedSignUp, setIsPressedSignUp] = useState(false);
  const [isPressedUser, setIsPressedUser] = useState(false);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (menuItem) => {
    setAnchorEl(null);
    if (menuItem === 'Logout') {
      navigation.navigate('LoginPage');
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='LoginPage'
        screenOptions={{
          headerLeft: () => null,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: 'cornsilk',
          },
          headerTitleStyle: {
            color: 'chocolate',
            fontFamily: 'sans-serif',
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name='LoginPage'
          component={LoginPage}
          options={{
            headerRight: () => (
              <View style={styles.container}>
                <View style={styles.buttonContainer}>
                  <Pressable
                    onPress={handleClick}
                    onPressIn={() => setIsPressedSignIn(true)}
                    onPressOut={() => setIsPressedSignIn(false)}
                    style={[styles.button, { opacity: isPressedSignIn ? 0.5 : 1 }]}
                  >
                    <LoginOutlinedIcon style={styles.icon}/>
                    <Text style={styles.text}>Sign In</Text>
                  </Pressable>
                  <Pressable
                    onPress={handleClick}
                    onPressIn={() => setIsPressedSignUp(true)}
                    onPressOut={() => setIsPressedSignUp(false)}
                    style={[styles.button, { opacity: isPressedSignUp ? 0.5 : 1 }]}
                  >
                    <PersonAddAltOutlinedIcon style={styles.icon}/>
                    <Text style={styles.text}>Sign Up</Text>
                  </Pressable>
                </View>
              </View>
            )
          }}

        />
        <Stack.Screen
          name='HomePage'
          component={HomePage}
          options={{
            headerRight: () => (
              <View style={styles.container}>
                <Pressable
                  onPress={handleClick}
                  onPressIn={() => setIsPressedUser(true)}
                  onPressOut={() => setIsPressedUser(false)}
                  style={[styles.button, { opacity: isPressedUser ? 0.5 : 1 }]}
                >
                  <Text style={styles.text}>User</Text>
                </Pressable>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={open}
                  onClose={() => handleClose('')}
                >
                  <MenuItem onClick={() => handleClose('Profile')}>Profile</MenuItem>
                  <MenuItem onClick={() => handleClose('My account')}>My account</MenuItem>
                  <MenuItem onClick={() => handleClose('Logout')}>Logout</MenuItem>
                </Menu>
              </View>
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: 'row', // Arrange buttons horizontally
  },
  button: {
    borderWidth: 2,
    borderColor: 'chocolate',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'cornsilk',
    marginHorizontal: 5, // Add some horizontal margin between buttons
  },
  text: {
    fontWeight: 'bold',
    color: 'chocolate',
  },
  icon: {
    fontSize: 'small',
    alignSelf: 'center',
    color: 'chocolate',
  },
});