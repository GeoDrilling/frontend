import {FC, useContext, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';

import './index.css';
import {Context} from "./main.tsx";
import {privateRoutes, publicRoutes} from "./utils/routes.tsx";
import {observer} from "mobx-react-lite";


const App: FC = observer(() => {
    const {store} = useContext(Context)
    useEffect(() => {
        store.checkAuth()
    })
    if (store.isLoading) {
        return <div>Загрузка...</div>
    }
    return (
        <Routes>
            {store.isAuth ?
                privateRoutes.map(route =>
                    <Route path={route.path}
                           element={route.element}
                           key={route.path}
                    />) :
                publicRoutes.map(route =>
                    <Route path={route.path}
                           element={route.element}
                           key={route.path}
                    />)
            }
        </Routes>
    );
});

export default App;
