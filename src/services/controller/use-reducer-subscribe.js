
// outsource dependencies
import { useDispatch } from 'react-redux';
import { useCallback, useEffect } from 'react';

// local dependencies
import useReducer from './use-reducer';
import { removeCSDAction, createCSDAction } from './reducer';

/* HOOK */
export default controller => {
    const name = controller.name;
    const initial = controller.initial;
    const dispatch = useDispatch();
    const remove = useCallback(() => dispatch(removeCSDAction(name)), [name, dispatch]);
    const create = useCallback(() => dispatch(createCSDAction(name, initial)), [initial, name, dispatch]);
    useEffect(() => create() && (() => remove()), [create, remove]);
    return useReducer(controller);
};

