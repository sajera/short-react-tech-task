
// outsource dependencies
import _ from 'lodash';

// NOTE CSD - controller service data
const CSD_REDUCER_PATH = 'controller';

const TYPE = (prefix => ({
    ADD: `${prefix}ADD`,
    CLEAR: `${prefix}CLEAR`,
    UPDATE: `${prefix}UPDATE`,
    REMOVE: `${prefix}REMOVE`,
}))('@CSD-store/');

/* ACTIONS */
export const clearCSDAction = name => ({ type: TYPE.CLEAR, name });
export const removeCSDAction = name => ({ type: TYPE.REMOVE, name });
export const createCSDAction = (name, initial) => ({ type: TYPE.ADD, name, initial });
export const updateCSDAction = (name, payload) => ({ type: TYPE.UPDATE, name, payload });
export const clearCSD = name => () => clearCSDAction(name);
export const removeCSD = name => () => removeCSDAction(name);
export const createCSD = name => initial => createCSDAction(name, initial);
export const updateCSD = name => payload => updateCSDAction(name, payload);

/* SELECTOR */
const selector = state => _.get(state, CSD_REDUCER_PATH);
const selectCSD = (state, name) => ((selector(state) || {})[name]) || {};
export const selectActualCSD = name => state => selectCSD(state, name).actual || {};

/* REDUCER */
export const reducer = (state = {}, action) => {
    // NOTE "name" it's required unique identifier for dynamic reducers
    const { type, name, initial = {}, payload = {} } = action;
    const current = _.get(state, name) || {};

    switch (type) {
        default: return state;
        case TYPE.REMOVE:
            // NOTE remove dynamic reducer
            return { ...state, [name]: null };
        case TYPE.CLEAR:
            // NOTE bring dynamic reducer state to initial values
            return { ...state, [name]: { ...current, actual: { ...current.initial } } };
        case TYPE.ADD:
            // NOTE initialize new dynamic reducer
            return { ...state, [name]: { actual: { ...initial }, initial } };
        case TYPE.UPDATE:
            // NOTE most used action for dynamic reducers
            return { ...state, [name]: { ...current, actual: { ...current.actual, ...payload } } };
    }
};
