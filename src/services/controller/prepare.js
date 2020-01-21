
// outsource dependencies
import _ from 'lodash';

// local dependencies
import { selectActualCSD, updateCSD, clearCSD } from './reducer';

export default option => {
    const ctrlName = _.uniqueId(typeof option.prefix === 'string' ? option.prefix : 'controller');
    if (!isGeneratorFn(option.subscriber)) {
        throw new Error(`Controller(${ctrlName}) "subscriber" is required and should be generator "sagas"`);
    }

    const createTypes = _.isArray(option.types) ? option.types : [];
    createTypes.map(type => type.toUpperCase());

    const subscriber = option.subscriber;
    const initial = _.isObject(option.initial) ? option.initial : {};
    // predefined actions for reducer data
    const action = {
        clearCtrl: clearCSD(ctrlName),
        updateCtrl: updateCSD(ctrlName),
    };
    //
    const TYPE = {};
    createTypes.map(type => {
        // create unique action type
        TYPE[type] = `@${ctrlName}/${type}`;
        // create action creator for this type
        return action[_.camelCase(type)] = payload => ({ type: TYPE[type], payload });
    });

    return {
        TYPE,
        initial,
        action,
        subscriber,
        name: ctrlName,
        selector: selectActualCSD(ctrlName),
    };
};

/*
 *
 * @param {Any} options
 * @returns {Boolean}
 */
function isGeneratorFn (fn) {
    // FIXME on production build the generator will compile to "switch function"
    return typeof fn === 'function';
    // FIXME it's mean the validation is "isGeneratorFn" should be simplified too
    // return typeof fn === 'function' && fn.constructor && fn.constructor.name === 'GeneratorFunction';
}
