import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { renderRoutes  } from "./startup/routes.jsx";

ReactDOM.render(renderRoutes(), document.getElementById('root'));
registerServiceWorker();
