import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles({
  root: {
    minWidth: 400,
    margin: "20px",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  text: {
    width: 350,
    margin: "10px",
  },
});

function PaymentMode({ setPaymentMode }) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    card: false,
    INTERACT: true,
    cod: false,
  });

  const handleChange = (event) => {
    if (event.target.name === "INTERACT") {
      setState({
        ...state,
        [event.target.name]: event.target.checked,
        card: !event.target.checked,
      });
      // setPaymentMode("INTERACT");
    } else {
      setState({
        ...state,
        [event.target.name]: event.target.checked,
        INTERACT: !event.target.checked,
      });
      // setPaymentMode("card");
    }
    // setState({ ...state, [event.target.name]: event.target.checked });
  };

  const { card, cod, INTERACT } = state;
  const error = [card, cod, INTERACT].filter((v) => v).length !== 2;
  return (
    <Card className={classes.root}>
      <CardContent>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Payment Mode</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={card}
                  onChange={handleChange}
                  name="card"
                  color="primary"
                  onClick={(event) =>
                    event.target.checked
                      ? setPaymentMode("card")
                      : setPaymentMode("INTERACT")
                  }
                />
              }
              label="Credit / Debit Card"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={card ? false : true}
                  onChange={handleChange}
                  name="INTERACT"
                  color="primary"
                  onClick={(event) =>
                    event.target.checked
                      ? setPaymentMode("INTERACT")
                      : setPaymentMode("card")
                  }
                />
              }
              label="INTERACT"
            />
            <FormControlLabel
              disabled
              control={
                <Checkbox checked={cod} onChange={handleChange} name="cod" />
              }
              label="COD(Cash On Delivery) *"
            />
          </FormGroup>
          <FormHelperText>* Not Available </FormHelperText>
        </FormControl>
      </CardContent>
    </Card>
  );
}
export default PaymentMode;
