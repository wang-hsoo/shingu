import React from 'react';
import ReactDOM from "react-dom";
import App from './App';
import { Provider } from "react-redux";
import store from './store/store';
import { RecoilRoot } from 'recoil';



ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <Provider store={store}> 
        <App />
      </Provider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);


