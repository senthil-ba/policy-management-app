import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Policy(props) {
  console.log('Inside Policy component'); 
  console.log(props.policyDetails);
  const classes = useStyles();

  return (
    <Card key={props.policyDetails.id} className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Policy Details
        </Typography>
        <Typography variant="h5" component="h2">
          Policy Type: {props.policyDetails.policyName}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Policy Amount: { props.policyDetails.policyAmount }
        </Typography>
        <Typography variant="body2" component="p">
          Policy Tenure: { props.policyDetails.policyTenure }
          <br />
          Policy Registration: { props.policyDetails.policyStartDate }
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Download</Button>
      </CardActions>
    </Card>
  );
}