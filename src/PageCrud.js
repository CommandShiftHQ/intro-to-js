import React, { Component } from 'react'
import { firestore } from './config'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const PageWrapper = styled.div`
  margin: 0 auto;
  max-width: 980px;
  padding: 50px;
  overflow: auto;
  flex: 1;
`

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3,
  },
});

class PageCrud extends Component {
  state = {
    page: null
  }

  setPage = (props) => {
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

  doCrud = () => {
    const { match: { params: { pageId } } } = this.props;

    if (pageId) {
      firestore.collection('pages').doc(pageId).set({
        name: this.name.value,
        content: this.content.value,
        order: Number(this.order.value)
      })
    } else {
      firestore.collection('pages').add({
        name: this.name.value,
        content: this.content.value,
        order: Number(this.order.value)
      })
    }
  }

  render () {
    const { page } = this.state
    const { classes, match } = this.props;

    console.log(page)

    if (match.params.pageId && !page) {
      return null
    }

    return (
      <PageWrapper>
        <Paper className={classes.root} elevation={1}>
          <TextField
            label="Title"
            defaultValue={(page && page.name) || ''}
            margin="normal"
            inputRef={ref => this.name = ref}
            style={{ display: 'block' }}
            fullWidth
          />
          <TextField
            label="Content"
            multiline
            defaultValue={(page && page.content) || ''}
            margin="normal"
            inputRef={ref => this.content = ref}
            style={{ display: 'block' }}
            fullWidth
          />
          <TextField
            label="Order"
            defaultValue={(page && page.order) || ''}
            margin="normal"
            inputRef={ref => this.order = ref}
            style={{ display: 'block' }}
            fullWidth
          />
          <Button onClick={this.doCrud}>Save</Button>
        </Paper>
      </PageWrapper>
    )
  }
}

export default withStyles(styles)(PageCrud)
