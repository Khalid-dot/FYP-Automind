import {StyleSheet, Text} from 'react-native';

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    paddingHorizontal: 20,
    top: 19,
  },
  text: {
    color: '#091155',
    fontSize: 14,
    lineHeight: 40,
  },
  title: {
    color: '#091155',
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: 40,
    fontSize: 25,
  },
  subtitle: {
    fontSize: 14,
    color: 'grey',

    lineHeight: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    marginBottom: 15,
    borderRadius: 8,
  },
  input: {
    flex: 1,
    height: 44,
    paddingLeft: 10,
    color: '#333',
  },
  icon: {
    marginRight: 10,
  },
  clearIcon: {
    marginLeft: 10,
  },
  signUpButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#091155',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  signUpButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginRight: 5,
  },
  orText: {
    textAlign: 'center',
    color: 'grey',
    marginVertical: 20,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  socialButton: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
  signInText: {
    textAlign: 'center',
    color: 'gray',
  },
  signInLink: {
    color: '#091155',
  },
  passwordtext: {
    color: 'grey',
    textAlign: 'right',
  },
  passwordlink: {
    textAlign: 'right',
    color: '#091155',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 5,
  },
});

export default styles;
