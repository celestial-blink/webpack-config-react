import { createRoot } from 'react-dom/client';
import 'animate.css/animate.min.css';
import Routes from './routes';
import './styles/index.scss';

const root = createRoot(document.getElementById('app'));

root.render(<Routes />);

if (module.hot) {
    module.hot.accept();
}