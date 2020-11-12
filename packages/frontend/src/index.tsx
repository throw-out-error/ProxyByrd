import { Home } from "./pages/home";
import { BrowserRouter, Route } from "react-router-dom";
import { render } from "react-dom";
import React from "react";

render(
    <BrowserRouter>
        <Route path="/" exact component={Home} />
    </BrowserRouter>,
    document.querySelector("#root")
);
