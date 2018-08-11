import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { firestore } from './config/firebase'
import { Switch, Route, withRouter } from 'react-router-dom'
import Page from './Page'
import PageCrud from './PageCrud'

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#774872'
  },
});

class App extends Component {
  state = {
    pages: []
  }

  componentDidMount () {
    const pages = []

    firestore.collection('pages').orderBy('order').get().then(snapshot => {
      snapshot.forEach(page => pages.push({ id: page.id, ...page.data() }))

      this.setState({ pages })
    })
  }

  render() {
    const { classes } = this.props;
    const { pages } = this.state

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar>
            <Typography variant="title" color="inherit" noWrap>
              Intro to JavaScript
            </Typography>
          </Toolbar>
        </AppBar>

        <Switch>
          <Route exact path="/pages/:pageId" render={() => <Page pages={pages}/>} />
          <Route exact path="/crud" component={PageCrud} />
          <Route exact path="/crud/:pageId" component={PageCrud} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(App));
