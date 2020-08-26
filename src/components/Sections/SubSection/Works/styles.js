import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  box: {
    border: '1px solid #D9D9D9',
    borderLeftWidth: 3,
    borderLeftColor: '#C4A1A1',
    marginBottom: theme.spacing(2)
  },
  details: {
    border: '1px solid #D9D9D9'
  },
  button: {
    // padding: 0,
    minWidth: '0px !important'
  }
}))
