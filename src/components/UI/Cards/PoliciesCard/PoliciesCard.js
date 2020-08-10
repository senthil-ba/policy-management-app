import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import policyImage from '../../../../assets/images/policies.jpg';

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
  },
  media: {
    height: 100,
  },
});


export default function MediaCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={policyImage}
          title="Policy Details"
          component={Link}
          to='/policy'
        />
        <CardContent>
          <Typography gutterBottom variant="body1" component="p">
            No. of Policies : {props.policiesCount}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary"
          component={Link}
          to='/policy'>
          View Policies
        </Button>
      </CardActions>
    </Card>
  );
}
