import states from './states.json';
import styles from './styles';
import actions from './actions';
import views from './views';

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