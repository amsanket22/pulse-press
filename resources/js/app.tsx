import React from "react";
import ReactDOM from "react-dom/client";
import NewsSearch from "./components/NewsSearch";

const rootElement = document.getElementById("react-container");
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <NewsSearch />
        </React.StrictMode>
    );
}
