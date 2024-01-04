import React from "react";
import { render } from "react-dom";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

class PayInteract extends React.Component {
  state = {
    interactId: "",
  };
  handleInputChange = (e) => {
    const newInteractId = e.target.value; // Use e.target.value to get the input value
    this.setState({ interactId: newInteractId });
    this.props.setInteractId(newInteractId);
  };

  render() {
    const { interactId } = this.state;

    return (
      <div key="Payment">
        <div className="App-payment">
          <Grid container spacing={3}>
            <Grid item xs={6} style={{ marginTop: "50px" }}>
              <Typography
                variant="h5"
                gutterBottom
                style={{ textAlign: "center" }}
              >
                Enter Your Interact ID
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <form>
                <div className="form-group">
                  <TextField
                    variant="outlined"
                    type="text"
                    name="interactId"
                    className="form-control"
                    placeholder="Your Interact ID"
                    required
                    style={{ width: 300, margin: "5px" }}
                    value={interactId}
                    onChange={this.handleInputChange}
                  />
                </div>
              </form>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}
export default PayInteract;
