
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, Text, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';

import myTheme from '../../themes/base-theme';

const {
  pushRoute,
  replaceAt,
} = actions;

class Login extends Component {

  static propTypes = {
    replaceAt: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  replaceAt(route) {
    this.props.replaceAt('index', { key: route }, this.props.navigation.key);
  }

  pushRoute(route) {
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  render() {  // eslint-disable-line class-methods-use-this
    return (
      <Container theme={myTheme}>
        <Content>
          <Text style={{ marginTop: 180, marginLeft: 22, fontSize: 22, fontWeight: 'bold' }}>
            Login
          </Text>
          <Button onPress={Actions.home}>
            <Text>go to index</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindActions)(Login);
