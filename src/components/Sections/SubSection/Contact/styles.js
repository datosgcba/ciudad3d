import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  item: {
    marginBottom: theme.spacing(3)
  },
  asterisco: {
    color: 'red',
    display: 'inline-block',
    fontSize: '13px',
    marginLeft: theme.spacing(0.5)
  },
  captcha: {
    marginBottom: theme.spacing(1.5),
    marginTop: theme.spacing(1.5)
  }
}))
