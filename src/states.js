import states from './states.json';
import styles from './styles.json';
import actions from './actions/index.js';
import views from './views/index.js';

export default {
    ...states,
    styles,
    actions,
    views,
};

// Consider shifting state down instead of spreading it on the root level.
console.group('Application State:');
console.log({
    ...states,
    styles,
    actions,
    views,
});
console.groupEnd();