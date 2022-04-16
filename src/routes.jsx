// este archivo es el encargado de manejar las rutas de la aplicación


// importamos lo necesario para crear nuestras rutas para la aplicacion usando react-router-rom
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './views/Home';

const Routes = () => {
    return (
        <React.StrictMode>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Home} />
                </Switch>
            </BrowserRouter>
        </React.StrictMode>
    );
}

export default Routes;