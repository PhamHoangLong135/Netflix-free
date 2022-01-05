import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import { AuthContextProvider } from "./authContext/AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthContextProvider>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </AuthContextProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
