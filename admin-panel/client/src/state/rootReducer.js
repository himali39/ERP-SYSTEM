const { combineReducers } = require("@reduxjs/toolkit");
const { userReducer, globalReducer } = require("../state/index");

const rootReducer = combineReducers({
  user: userReducer,
  global: globalReducer,
});
export default rootReducer;
