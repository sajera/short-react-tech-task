
// outsource dependencies
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// NOTE development only !!!
library.add(fas);
library.add(fab);
library.add(far);

// NOTE production connected icons make sure in the repo wos not present development (unused) icons
// library.add(
//     fas.faEye,
// );
// library.add(
//     far.faBell,
// );
// library.add(
//     fab.faGoogle
// );
export default FontAwesomeIcon;
