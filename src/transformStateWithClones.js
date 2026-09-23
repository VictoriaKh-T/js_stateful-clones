'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let currentState = Object.assign({}, state);

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        currentState = addProperties(currentState, action.extraData);
        break;

      case 'removeProperties':
        currentState = removeProperties(currentState, action.keysToRemove);
        break;

      case 'clear':
        currentState = clearProperties(currentState);
        break;
    }
    history.push(currentState);
  }

  return history;
}

function addProperties(currentState, extra) {
  return Object.assign({}, currentState, extra);
}

function removeProperties(currentState, keysToRemove) {
  const newState = Object.assign({}, currentState);

  for (const key of keysToRemove) {
    delete newState[key];
  }

  return newState;
}

function clearProperties(currentState, actions) {
  const newState = Object.assign({}, currentState);

  for (const key in newState) {
    delete newState[key];
  }

  return newState;
}

module.exports = transformStateWithClones;
