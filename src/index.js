import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter } from 'react-router-dom'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#774872'
    }
  },
})

ReactDOM.render((
  <MuiThemeProvider theme={theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MuiThemeProvider>
), document.getElementById('root'));
registerServiceWorker();
