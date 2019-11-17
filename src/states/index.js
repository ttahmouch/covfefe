import states from './states.json';
import styles from '../styles.json';
import actions from '../actions/index.js';
import components from '../components.js';
import views from '../views/index.js';

// Namespace the non-states to allow them to spread flat on the state object and have reducers per item?
export default {
    ...states,
    styles,
    actions,
    components,
    views,
    // $reducers,
    // $reducer,
    // $store,
    // $dispatchers
};

// Consider shifting state down instead of spreading it on the root level.
console.group('Application State:');
console.log({
    ...states,
    styles,
    actions,
    components,
    views,
});
console.groupEnd();