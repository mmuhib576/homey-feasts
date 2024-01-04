import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Details from "./payment/Details";
import PaymentMode from "./payment/PaymentMode";
import Success from "./payment/Success";
import PayCard from "./payment/PayCard";
import image from "../assets-and-css/image.png";
import PayInteract from "./payment/PayInteract";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "./Cart/CartContext";
import { useAuth } from "./Auth/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    justifyContent: "center",
    height: "50vw",
  },
  actions: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  stepper: {
    iconColor: "#2E3B55",
  },
}));

function getSteps() {
  return ["Enter Details", "Payment Mode", "Payment", "Order Confirmed"];
}

function Payment() {
  const { cart, total, clearCart } = useCart();
  const { user } = useAuth();
  const userId = user.authUser._id;
  const handlePlaceOrder = async () => {
    await handleOrder(cart, total, userId);
    clearCart(); // Clear the cart when going back to /menu
    navigate("/menu"); // Navigate back to /menu
  };
  const navigate = useNavigate();

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();
  const [paymentMode, setPaymentMode] = useState("INTERACT");
  const [number, setNumber] = useState("");
  const [cvc, setCvc] = useState("");
  const [interactId, setInteractId] = useState("");

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };
  function getPaymentMethod() {
    if (paymentMode === "card") {
      return <PayCard setNumber={setNumber} setCvc={setCvc} />;
    } else if (paymentMode === "INTERACT") {
      return <PayInteract setInteractId={setInteractId} />;
    }
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <Details />;
      case 1:
        return <PaymentMode setPaymentMode={setPaymentMode} />;
      case 2:
        return getPaymentMethod();
      case 3:
        return <Success />;
      default:
        return "Unknown step";
    }
  }
  const handleNext = () => {
    if (activeStep === steps.length - 2) {
      handlePayment();
    }
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };
  const handlePayment = () => {
    if (paymentMode === "card") {
      axios
        .post("http://localhost:5001/payment/createpayment", {
          debitPayment: {
            cardNumber: parseInt(number),
            cvv: parseInt(cvc),
          },
        })
        .then((response) => {
          // Handle the response data here
          console.log("Response Data:", response.data);
        })
        .catch((error) => {
          // Handle any errors here
          console.error("Error:", error);
        });
    } else if (paymentMode === "INTERACT") {
      axios
        .post("http://localhost:5001/payment/createpayment", {
          interactPayment: {
            interactId: interactId,
          },
        })
        .then((response) => {
          // Handle the response data here
          console.log("Response Data:", response.data);
        })
        .catch((error) => {
          // Handle any errors here
          console.error("Error:", error);
        });
    }
  };
  const handleOrder = async (cart, total, userId) => {
    // Extract the meal details from the cart
    const meals = cart.map((cartItem) => ({
      meal: cartItem._id, // Assuming the cart item has an _id field
      quantity: cartItem.quantity,
    }));

    // Create the order object
    const orderData = {
      user: userId,
      meals,
      totalPrice: total,
    };
    console.log(orderData);

    try {
      // Send a POST request to the server to create the order
      const response = await fetch("http://localhost:5001/orders/createorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        // The order was successfully created, handle any additional logic if needed
        console.log("Order placed successfully!");
        console.log(response.data);
        // Reset the cart or perform any other necessary actions
      } else {
        // Handle errors or provide feedback to the user
        console.error("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error(
        "An error occurred while placing the order:",
        error.message
      );
    }
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const handleButton = () => {
    if (activeStep === steps.length - 1) {
      return (
        <Button
          variant="contained"
          style={{ background: "#2E3B55", color: "#ffffff" }}
          onClick={handlePlaceOrder}
          className={classes.button}
        >
          Go Back to Meals
        </Button>
      );
    } else if (activeStep === steps.length - 2) {
      return `Pay $${total} for your order.`;
    } else {
      return "Next";
    }
  };

  return (
    <div className={classes.root}>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={6}>
          <Card variant="outlined" style={{ marginTop: "5%" }}>
            <CardContent>
              <Grid container direction="row" alignItems="center">
                <Grid item xs={12}>
                  <AppBar
                    position="static"
                    style={{ background: "#2E3B55", alignItems: "center" }}
                  >
                    <Toolbar>
                      <img
                        src={image}
                        style={{ height: 30 }}
                        alt="logo"
                        className={classes.logo}
                      />
                    </Toolbar>
                  </AppBar>
                </Grid>
                <Grid item xs={12}>
                  <Stepper activeStep={activeStep} className={classes.stepper}>
                    {steps.map((label, index) => {
                      const stepProps = {};
                      const labelProps = {};
                      if (isStepOptional(index)) {
                        labelProps.optional = (
                          <Typography variant="caption"></Typography>
                        );
                      }
                      if (isStepSkipped(index)) {
                        stepProps.completed = false;
                      }
                      return (
                        <Step key={label} {...stepProps}>
                          <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                      );
                    })}
                  </Stepper>
                </Grid>

                {activeStep <= 2 && (
                  <Grid item xs={12}>
                    <h1 style={{ fontSize: "30px" }}>Due Amount: ${total}</h1>
                  </Grid>
                )}

                <Grid item xs={12}>
                  <div className={classes.actions}>
                    {activeStep === steps.length ? (
                      <div>
                        <Typography
                          className={classes.instructions}
                        ></Typography>
                        <Button
                          onClick={handleReset}
                          className={classes.button}
                        >
                          Reset
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <Typography
                          className={classes.instructions}
                          style={{ height: "350px" }}
                        >
                          {getStepContent(activeStep)}
                          <br />
                        </Typography>
                        <div className={classes.actions}>
                          {activeStep === steps.length - 1 ? (
                            " "
                          ) : (
                            <Button
                              disabled={activeStep === 0}
                              onClick={handleBack}
                              className={classes.button}
                            >
                              Back
                            </Button>
                          )}

                          <Button
                            variant="contained"
                            style={{ background: "#2E3B55", color: "#ffffff" }}
                            onClick={handleNext}
                            className={classes.button}
                          >
                            {handleButton()}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
export default Payment;
