import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { renderRoutes  } from "./startup/routes.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(renderRoutes(), document.getElementById('root'));
registerServiceWorker();
