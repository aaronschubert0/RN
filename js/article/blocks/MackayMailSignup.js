import React from 'react';
import {
  Text,
  TextInput,
  Image,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
const MackayMailSignup = ({ actions }) => (
  <Image
    source={{ uri: 'http://cms-v2.stv2.tv/assets/dist/img/blue-triangle-bg--large.jpg' }}
    style={mackayMailStyles.background}>
    <View style={mackayMailStyles.info}>
      <Image
        source={{ uri: 'http://cms-v2.stv2.tv/assets/dist/img/john-mackay--close-up.png' }}
        style={mackayMailStyles.image}
      />
      <View style={mackayMailStyles.captionContainer}>
        <Text style={mackayMailStyles.caption}>
          Want the inside story from John MacKay? Sign up to the 'MacKay Mail' newsletter.
        </Text>
      </View>
    </View>
    <EmailInput buttonText="Subscribe" />
    <TouchableOpacity>
      <Text style={mackayMailStyles.moreInfo}>
        More information
      </Text>
    </TouchableOpacity>
  </Image>
);
export default MackayMailSignup;

const EmailInput = ({ buttonText, onFocus, onSubmitEditing }) => (
  <View style={mackayMailStyles.emailContainer}>
    <TextInput
      style={mackayMailStyles.input}
      keyboardType="email-address"
      placeholder="Enter your email address"
      onFocus={onFocus}
      onSubmitEditing={onSubmitEditing}
      blurOnSubmit={true}
    />
    <View style={mackayMailStyles.buttonContainer}>
      <TouchableOpacity >
        <Text style={mackayMailStyles.buttonText}>
          {buttonText}
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

const mackayMailStyles = StyleSheet.create({
  background: {
    marginTop: 20,
    flex: 1,
    flexDirection: 'column',
    alignSelf: 'stretch',
    marginLeft: -10,
    marginRight: -10,
  },
  image: {
    height: 100,
    width: 90,
    marginLeft: 15,
    marginTop: 10,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  captionContainer: {
    flex: 1,
    padding: 10,
    paddingLeft: 20,
  },
  caption: {
    backgroundColor: 'transparent',
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  moreInfo: {
    backgroundColor: 'transparent'
  },
  emailContainer: {
    flexDirection: 'row',
    borderRadius: 3,
    marginLeft: 10,
    marginRight: 10
  },

  input: {
    height: 44,
    backgroundColor: '#fff',
    paddingLeft: 10,
    borderRadius: 3,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    flex: 3,
    paddingRight: 10
  },
  buttonContainer: {
    marginLeft: -10,
    flex: 1,
    height: 44,
    backgroundColor: '#54b1ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3
  },
  button: {

  },
  buttonText: {
    color: '#fff',
  },
  moreInfo: {
    alignSelf: 'center',
    color: '#fff',
    backgroundColor: 'transparent',
    fontSize: 12,
    fontWeight: '700',
    margin: 10
  }
});
