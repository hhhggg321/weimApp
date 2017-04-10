
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Container, Content, Button, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native'
import { Text, View } from 'react-native-animatable'
import AV from 'leancloud-storage';

import myTheme from '../../../themes/base-theme';
import CustomButton from '../../widgets/customButton'
import CustomTextInput from '../../widgets/customTextInput'

import styles from './style';
import { LOG_IN } from '../../../actions/session';

class Login extends Component {

  static propTypes = {
    isLoading: PropTypes.bool,
    session: React.PropTypes.shape({
      token: React.PropTypes.string,
      userName: React.PropTypes.string,
      isLogin: React.PropTypes.bool
    })
  }

  state = {
    phone: '',
    password: '',
    fullName: '',
    errorMessage: '',
    countDown: 60,
    smsButtonDisabled: false,
    smsButtonText: '获取验证码'
  }


  render() {  // eslint-disable-line class-methods-use-this
    const { phone, password } = this.state
    // const { isLoading} = this.props
    const isLoading = false;
    
    const isValid = phone !== '' && password !== ''
    return (
      <View style={styles.container}>

        <View style={styles.logo} animation={'zoomInDown'} duration={800} delay={200}>
          <Image style={{width: 130, height: 130}} source={require('../../../image/logo/logo.png')} />
        </View>
        
        <View style={styles.form} ref={(ref) => { this.formRef = ref }}>
          <CustomTextInput
            name={'phone'}
            ref={(ref) => this.phoneInputRef = ref}
            placeholder={'手机号'}
            keyboardType={'numeric'}
            editable={!isLoading}
            returnKeyType={'next'}
            blurOnSubmit={false}
            withRef={true}
            onSubmitEditing={() => this.passwordInputRef.focus()}
            onChangeText={(value) => this.setState({ phone: value })}
            isEnabled={!isLoading}
          />
          <TouchableOpacity style={styles.smsButton} disabled={this.state.smsButtonDisabled} onPress={() => {this.getSmsCode(phone); }}>
              <Text style={styles.btnText}>
                  {this.state.smsButtonText}
              </Text>
          </TouchableOpacity>
          <CustomTextInput
            name={'password'}
            ref={(ref) => this.passwordInputRef = ref}
            placeholder={'验证码'}
            keyboardType={'numeric'}
            editable={!isLoading}
            returnKeyType={'done'}
            secureTextEntry={false}
            withRef={true}
            onChangeText={(value) => this.setState({ password: value })}
            isEnabled={!isLoading}
          />
        </View>
        <Text
          ref={(ref) => this.linkRef = ref}
          style={styles.errorMessage}
          animation={'fadeIn'}
          duration={600}
          delay={400}
        >
            {this.state.errorMessage}
        </Text>
        <View style={styles.footer}>
          <View ref={(ref) => this.buttonRef = ref} animation={'bounceIn'} duration={600} delay={400}>
            <CustomButton
              onPress={() => this.onLoginPress(phone, password)}
              isEnabled={true}
              isLoading={isLoading}
              buttonStyle={styles.loginButton}
              textStyle={styles.loginButtonText}
              text={'登 录'}
            />
          </View>
          <Text
            ref={(ref) => this.linkRef = ref}
            style={styles.signupLink}
            onPress={Actions.register}
            animation={'fadeIn'}
            duration={600}
            delay={400}
          >
            {'还没注册？'}
          </Text>

          <TouchableOpacity style={styles.wechat} onPress={() => {this.loginByWechat(); }}>
              <Image style={{width: 35, height:35}} source={require('../../../image/wechat/wechat.png')} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  hideForm = async () => {
    if (this.buttonRef && this.formRef && this.linkRef) {
      await Promise.all([
        this.buttonRef.zoomOut(200),
        this.formRef.fadeOut(300),
        this.linkRef.fadeOut(300)
      ])
    }
  }

  getSmsCode(phone){
    //verify phone number
    if(!this.testPhoneFormat(phone)){
      return;
    }
    this.setState({errorMessage: ''});
    this.setTime();
     AV.Cloud.requestSmsCode(phone).then(
      (success) => {
        alert('发送成功！');
      }, 
      (error) => {
        alert('验证码发送失败，请重试！');
      }
    );
  }

  testPhoneFormat(phone){
    var myreg = /^(((13[0-9]{1})|159|153)+\d{8})$/;
    if(!myreg.test(phone)){
        this.setState({errorMessage: '请输入正确的手机号！'});
        return false;
    }else{
      return true;
    }
  }

  onLoginPress(phone, password){
    if(!this.testPhoneFormat(phone)){
      return;
    }
    if(!this.state.password){
      this.setState({errorMessage: '验证码不能为空！'});
      return;
    }
    AV.User.signUpOrlogInWithMobilePhone(phone, password).then(
      (user) => {
        this.props.logIn(LOG_IN, user._sessionToken, user._serverData.username);
      }, 
      (error) => {
        alert('验证码错误！');
      }
    );
  }

loginByWechat(){
    alert('login by wechat')
    AV.User.signUpOrlogInWithAuthData({
      // 微博（weibo）用 uid
      // 微信（weixin）和 QQ（qq）用 openid
      "openid": "oPrJ7uM5Y5oeypd0fyqQcKCaRv3o",
      "access_token": "OezXcEiiBSKSxW0eoylIeNFI3H7HsmxM7dUj1dGRl2dXJOeIIwD4RTW7Iy2IfJePh6jj7OIs1GwzG1zPn7XY_xYdFYvISeusn4zfU06NiA1_yhzhjc408edspwRpuFSqtYk0rrfJAcZgGBWGRp7wmA",
      "expires_at": "2016-01-06T11:43:11.904Z"
    }, 'weixin').
    then(function (s) {
      console.log('first  ', s);
    }, function (e) {
      console.log('second ', e);
    });
  }

  setTime() { 
    if (this.state.countDown == 0) { 
      this.setState({
        smsButtonDisabled: false,
        smsButtonText: '获取验证码',
        countDown: 60
      });
      return;
    } else {
      this.setState({
        smsButtonDisabled: true,
        smsButtonText: this.state.countDown + 's',
        countDown: --this.state.countDown
      });
    } 
    setTimeout(() => {
      this.setTime();
    },1000) 
  } 

}

function bindActions(dispatch) {
  return {
    logIn: (action, token, userName) => {
      dispatch({
                type: action,
                token: token,
                userName: userName
              });
    }
  }
}

const mapStateToProps = state => ({
  session: state.session
});

export default connect(mapStateToProps, bindActions)(Login);
