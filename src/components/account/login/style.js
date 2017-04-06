
import { StyleSheet } from 'react-native';
import metrics from '../../../config/metrics';

export default styles = StyleSheet.create({
  container: {
    paddingHorizontal: metrics.DEVICE_WIDTH * 0.1
  },
  form: {
    marginTop: 180
  },
  footer: {
    marginTop:20,
    height: 100,
    justifyContent: 'center'
  },
  loginButton: {
    backgroundColor: 'white'
  },
  loginButtonText: {
    color: '#3E464D',
    fontWeight: 'bold'
  },
  signupLink: {
    color: '#000000',
    // color: 'rgba(255,255,255,0.6)',
    alignSelf: 'center',
    padding: 20
  },

  errorMessage: {
    color: 'red',
    alignSelf: 'flex-start',
    padding: 20
  },

  smsButton: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    position: 'relative',
    top: -40,
  },
  btnText: {
  }
})