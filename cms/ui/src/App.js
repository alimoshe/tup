import MainPage from "./components/main-page/mainPage";
import React from "react";

import {BrowserRouter} from "react-router-dom";
import MainPageComponent from "./components/main-page/mainPage";
import {RecoilRoot} from "recoil";

function App() {
    return (
        <BrowserRouter>
            <RecoilRoot>
                <MainPageComponent/>
            </RecoilRoot>
        </BrowserRouter>

    );
}

export default App;
