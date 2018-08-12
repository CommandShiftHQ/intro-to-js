import React, { Component, Fragment } from 'react'
import { firestore } from './config'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import { withRouter } from 'react-router-dom';
import Markdown from 'markdown-to-jsx'
import Repl from './Repl'

const PageWrapper = styled.div`
  margin: 0 auto;
  max-width: 980px;
  line-height: 1.5rem;
`

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    width: 270,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0,
    overflow: 'auto'
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3,
  },
});

class Page extends Component {
  state = {
    page: null
  }

  setPage = () => {
    const { match: { params: { pageId } } } = this.props;

    if (pageId) {
      firestore.collection('pages').doc(pageId).get().then(page => {
        this.setState({ page: page.data() })
      })
    }
  }

  componentDidMount () {
    this.setPage()
  }

  componentDidUpdate (prevProps) {
    if (prevProps.match.params.pageId !== this.props.match.params.pageId) {
      this.setPage()
    }
  }

  render () {
    const { page } = this.state
    const { classes, pages, history, match } = this.props;

    if (!page) {
      return null
    }

    const activePage = pages.find(page => page.id === match.params.pageId)

    return (
      <Fragment>
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <Stepper nonLinear activeStep={(activePage && (activePage.order - 1)) || 0} orientation="vertical">
            {pages.map(({ id, name }) => {
              return (
                <Step key={id}>
                  <StepButton onClick={() => history.push(`/pages/${id}`)}>{name}</StepButton>
                </Step>
              );
            })}
          </Stepper>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <PageWrapper>
            <Paper className={classes.paper} elevation={1}>
              <Typography variant="display1" gutterBottom>
                {page.name}
              </Typography>
              <Markdown options={{
                overrides: {
                  Repl: {
                    component: Repl
                  }
                }
              }}>
                {page.content}
              </Markdown>
            </Paper>
          </PageWrapper>
        </main>
      </Fragment>
    )
  }
}

export default withRouter(withStyles(styles)(Page))
