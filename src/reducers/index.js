
import { combineReducers } from 'redux';

import drawer from './drawer';
import session from './session';
import cardNavigation from './cardNavigation';

export default combineReducers({
  drawer,
  session,
  cardNavigation,
});
