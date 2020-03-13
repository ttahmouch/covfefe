import $states from './states/index.js';
import $styles from './styles/index.js';
import $actions from './actions/index.js';
import $composers from './composers/index.js';
import $views, {view as $view} from './views/index.js';

export default {
    $states,
    $styles,
    $actions,
    $components: $composers,
    $views,
    $view,
};