
import { StyleSheet } from 'react-native';
import metrics from '../../../config/metrics';

export default styles = StyleSheet.create({
  container: {
    paddingHorizontal: metrics.DEVICE_WIDTH * 0.1
  },
  logo: {
    marginTop: 100,
    alignSelf: 'center'
  },
  form: {
    marginTop: 50
  },
  footer: {
    marginTop: 20,
    height: 100,
    justifyContent: 'center'
  },
  loginButton: {
    marginTop: 15,
    backgroundColor: 'white'
  },
  loginButtonText: {
    color: '#3E464D',
    fontWeight: 'bold'
  },
  signupLink: {
    color: '#000000',
    alignSelf: 'center',
    padding: 20
  },

  errorMessage: {
    color: 'red',
    alignSelf: 'flex-start',
    paddingTop: 10,
    paddingBottom: 20

  },

  smsButton: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    position: 'relative',
    top: -40,
  },
  btnText: {
  },
  wechat: {
    marginTop: 20,
    alignSelf: 'center',
  }
})