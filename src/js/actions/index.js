import * as ticketActions from './ticketActions';
import * as navigationActions from './navigationActions';

const rootActions = {
    ...navigationActions,
    ...ticketActions
};

export default rootActions;