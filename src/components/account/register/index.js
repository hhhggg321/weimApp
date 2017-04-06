
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, Text, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';

import myTheme from '../../../themes/base-theme';

class Register extends Component {

  static propTypes = {
    session: React.PropTypes.shape({
      token: React.PropTypes.string,
      userName: React.PropTypes.string,
      isLogin: React.PropTypes.bool
    })
  }

  render() {  // eslint-disable-line class-methods-use-this
    return (
      <Container theme={myTheme}>
        <Content>
          <Text style={{ marginTop: 180, marginLeft: 22, fontSize: 22, fontWeight: 'bold' }}>
            register
          </Text>
        </Content>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
  };
}

const mapStateToProps = state => ({
  session: state.session
});

export default connect(mapStateToProps, bindActions)(Register);
