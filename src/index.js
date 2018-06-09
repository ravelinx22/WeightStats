import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { renderRoutes  } from "./startup/routes.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import 'font-awesome/css/font-awesome.min.css';

ReactDOM.render(renderRoutes(), document.getElementById('root'));
registerServiceWorker();
