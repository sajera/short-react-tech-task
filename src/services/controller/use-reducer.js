
// outsource dependencies
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

// local dependencies
import { selectActualCSD } from './reducer';

/* HOOK */
export default controller => {
    const name = controller.name;
    const initial = controller.initial;
    const actual = useSelector(selectActualCSD(name));
    return useMemo(() => ({ ...initial, ...actual }), [initial, actual]);
};
