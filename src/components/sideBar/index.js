
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Button, Text } from 'native-base';

import navigateTo from '../../actions/sideBarNav';

class SideBar extends Component {

  static propTypes = {
    navigateTo: React.PropTypes.func,
  }
  navigateTo(route) {
    this.props.navigateTo(route, 'index');
  }

  render() {  // eslint-disable-line class-methods-use-this
    return (
      <Text>drawer</Text>
      /*<View>
        <Text>drawer</Text>
      </View>*/
      );
  }
}

function bindAction(dispatch) {
  return {
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(SideBar);
