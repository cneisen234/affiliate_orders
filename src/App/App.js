import React, { Component } from "react";
import "./App.css";
import MUITable from "../MUITable.js";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import moment from "moment";
import Footer from "../Footer/Footer";
import { Paper, TextField } from "@material-ui/core";

class App extends Component {
  state = {
    toggle: false,
    id: "",
    order_number: "",
    sku: "",
    email: "",
  };
  componentDidMount() {
    this.props.dispatch({
      type: "GET_ITEM_LIST",
    });
           this.props.dispatch({
             type: "GET_EMAIL_LIST",
           });
             this.props.dispatch({
               type: "GET_TOTAL_LIST",
             });
  }
  handleChange = (event, fieldName) => {
    this.setState({ [fieldName]: event.target.value }); //sets to value of targeted event
  }; //end handleChange
  //toggles edit window
  toggle = () => {
    this.setState({
      toggle: !this.state.toggle,
    });
  };
  toggle2 = () => {
    this.setState({
      toggle2: !this.state.toggle2,
    });
  };
  checkEmail = (event) => {
    //prevents default action
    event.preventDefault();
    const { email } = this.state;
    console.log("this is state", email)
    this.props.dispatch({
      type: "CHECK_EMAIL",
      payload: {
        email: email,
      },
    });
      this.props.dispatch({
            type: "GET_SKUNUM_LIST",
          });
  };

  
  render() {
    const data = this.props.itemlist.map((item) => [
      item.email,
      item.order_number,
      Number(item.order_total).toFixed(2),
      item.qty,
      item.created_at
    ]);

         const totaldata = this.props.totallist.map((total) => [
           total.email,
           total.count,
         ]);
          const skunumdata = this.props.skunumlist.map((skunum) => [
            skunum.sku,
            skunum.count,
          ]);
    return (
      <div>
        <div style={{ backgroundColor: "white", width: "20%", float: "left" }}>
          <img
            src="https://cdn11.bigcommerce.com/s-et4qthkygq/images/stencil/177x60/htwlogo_web_1573140308__59565.original.png"
            alt="HTW logo"
          ></img>
        </div>
        <div style={{ backgroundColor: "black", width: "80%", float: "right" }}>
          <div style={{ height: 50 }}></div>
        </div>
        <br />
        <br />
        <center></center>
        <div style={{ padding: "1.5%" }}>
          <h1 style={{ textAlign: "center" }}>Affiliate Order History</h1>
          <MUITable
            data={data} //brings in data as an array, in this case, list of items
            columns={[
              //names the columns found on MUI table
              { name: "Affiliate Email" },
              { name: "Order Number" },
              { name: "Order Total" },
              { name: "Number of items sold" },
              { name: "Date of Sale" },
              {
                name: "View Details",
                options: {
                  filter: false,
                  sort: false,
                  empty: true,
                  customBodyRenderLite: (dataIndex, rowIndex) => {
                    return (
                      <Button
                        variant="success"
                        onClick={(event) => {
                          event.preventDefault();
                          const itemArray = this.props.itemlist;
                          const item = itemArray[dataIndex];
                          const order_number = item.order_number;
                          console.log("this is item", item);
                          console.log("this is order_number", order_number);
                          this.setState({
                            toggle: !this.state.toggle,
                            order_number: order_number,
                          });
                          console.log("this is state", this.state.order_number);
                          this.props.dispatch({
                            type: "ORDER_DETAILS",
                            payload: {
                              order_number: order_number,
                            },
                          });
                          console.log(
                            "this is details",
                            this.props.detailslist
                          );
                        }}
                      >
                        View Details
                      </Button>
                    );
                  },
                },
              },
            ]}
            title={"Record of Sales"} //give the table a name
          />
        </div>
        <br />
        <br />
        <br />
        <div style={{ padding: "1.5%" }}>
          <MUITable
            data={totaldata} //brings in data as an array, in this case, list of items
            columns={[
              //names the columns found on MUI table
              { name: "Affiliate Email" },
              { name: "Total items sold" },
            ]}
            title={"All items sold per affiliate"} //give the table a name
          />
        </div>
        <br />
        <br />
        <br />
        <div style={{ padding: "1.5%" }}>
          <center>
            <h1>Select an Affilate</h1>
            <Form.Control
              as="select"
              onChange={(event) => this.setState({ email: event.target.value })}
            >
              <option value="">Pick From Below </option>{" "}
              {this.props.emaillist
                ? this.props.emaillist.map((item) => (
                    <option key={item.id} value={item.id}>
                      {" "}
                      {String(item.email)}{" "}
                    </option>
                  ))
                : ""}
            </Form.Control>
            <Form>
              <center>
                <Button
                  onClick={(event) => this.checkEmail(event)}
                  variant="success"
                  type="submit"
                  style={{ width: "20%", margin: "2%" }}
                >
                  Confirm Affilate
                </Button>
              </center>
            </Form>
          </center>
          <MUITable
            data={skunumdata} //brings in data as an array, in this case, list of items
            columns={[
              //names the columns found on MUI table
              { name: "SKU" },
              { name: "Count" },
            ]}
            title={`Skus for ${this.state.email}`} //give the table a name
          />
          {this.state.toggle === false ? (
            //if toggle is false, render nothing. This is the default
            <span></span>
          ) : (
            //...else render the edit screen for the selected song
            <Paper
              style={{
                right: 0,
                bottom: 0,
                position: "fixed",
                borderRadius: "10%",
                height: "400px",
                width: "400px",
                fontSize: "15px",
                backgroundColor: "white",
                zIndex: Infinity,
              }}
              elevation="24"
              className="loginBox"
            >
              <div
                style={{
                  backgroundColor: "white",
                }}
              >
                {JSON.stringify(this.props.detailslist)}{" "}
                {/* toggles edit window back to not displaying */}
                <Button onClick={this.toggle} variant="success" type="submit">
                  Close
                </Button>
              </div>
            </Paper>
          )}
        </div>
        <br />
        <br />
        <br />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  itemlist: state.item.itemlist,
  skunumlist: state.item.skunumlist,
  emaillist: state.item.emaillist,
  detailslist: state.item.detailslist,
  totallist: state.item.totallist,
});
export default connect(mapStateToProps)(App);
