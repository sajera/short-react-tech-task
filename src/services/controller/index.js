
// outsource dependencies

// local dependencies
import { sagas } from './saga';
import { reducer } from './reducer';
import prepareController from './prepare';

import useActions from './use-actions';
import useReducer from './use-reducer';
import useSagaSubscribe from './use-saga-subscribe';
import useReducerSubscribe from './use-reducer-subscribe';

/**
 * Controller require connection to react-redux and redux-saga
 * please make sure you connected to react-redux
 * @example
 * import { reducer as controller } from './services/controller.service';
 *
 * and setup saga subscriber
 * import { sagas as controllerSagas } from './services/controller.service';
 *
 */
export {
    // connect
    sagas,
    reducer,
    // check correctness of minimum required data and make some prepare
    prepareController,
};

/**
 * HOOK "useController"
 * contain all hooks which required to make controller alive
 * IMPORTANT in one time in the DOM  "useController" can subscribed not more than one time for one controller
 * if you need get some useful thing of controller outside of component subscriber use hook helpers
 */
export const useController = controller => [
    useReducerSubscribe(controller), // data => data stored in to redux for
    useActions(controller),
    useSagaSubscribe(controller)
];

/**
 * HOOK helper "useControllerActions"
 * provide ability to use controller actions outside of component subscriber
 */
export const useControllerActions = useActions;

/**
 * HOOK "useControllerData"
 * provide ability to use controller data outside of component subscriber
 */
export const useControllerData = useReducer;
