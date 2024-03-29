import React, { Component } from "react";
import "./App.css";
import MUITable from "../MUITable.js";
import MUITable2 from "../MUITable2.js";
import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import LuxonUtils from '@date-io/luxon';
import Form from "react-bootstrap/Form";
import moment from "moment";
import Footer from "../Footer/Footer";
import { Paper, Button } from "@material-ui/core";

class App extends Component {
  state = {
    toggle: false,
    toggle2: true,
    id: "",
    order_number: "",
    sku: "",
    email: "",
    data: [],
    startDate: {year: 2021, month: 1, day: 1},
    endDate: {year: 2021, month: 1, day: 1},
  };
  componentDidMount() {
    this.props.dispatch({
      type: "GET_VIEWED",
    });
        this.props.dispatch({
          type: "GET_SKUS",
        });
           this.props.dispatch({
             type: "GET_TOP_FIVE",
           });
    this.props.dispatch({
      type: "ORDER_DETAILS1",
    });
    this.props.dispatch({
      type: "ORDER_DETAILS2",
    });
    this.props.dispatch({
      type: "ORDER_DETAILS3",
    });
    this.props.dispatch({
      type: "ORDER_DETAILS4",
    });
    this.props.dispatch({
      type: "ORDER_DETAILS5",
    });
    this.props.dispatch({
      type: "ORDER_DETAILS6",
    });
    this.props.dispatch({
      type: "ORDER_DETAILS7",
    });
    this.props.dispatch({
      type: "ORDER_DETAILS8",
    });
    this.props.dispatch({
      type: "ORDER_DETAILS9",
    });
    this.props.dispatch({
      type: "GET_ITEM_LIST",
    });
    this.props.dispatch({
      type: "GET_EMAIL_LIST",
    });
    this.props.dispatch({
      type: "GET_TOTAL_LIST",
    });
    this.props.dispatch({
      type: "DELETE_ITEM_RANGE",
    });
    this.props.dispatch({
      type: "DELETE_SKU_RANGE",
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.detailslist1 !== prevProps.detailslist1) {
      let data = this.state.data;
      let { detailslist1 } = this.props;
      detailslist1 &&
        detailslist1.data.map((item) => {
          let sku = String(item.sku);
          let name = String(item.name);
            let skuCheck = sku.slice(0, 2);
          if (item.is_visible === true) {
            if (skuCheck === "CS" && name.includes("PSV") === true) {
              console.log("skipping this one");
            } else {
              data.push(item);
            }
          }
        });
      this.setState({
        data: data,
      });
    }
    if (this.props.detailslist2 !== prevProps.detailslist2) {
      let data = this.state.data;
      let { detailslist2 } = this.props;
      detailslist2 &&
        detailslist2.data.map((item) => {
          let sku = String(item.sku);
          let name = String(item.name);
          let skuCheck = sku.slice(0, 2);
          if (item.is_visible === true) {
            if (skuCheck === "CS" && name.includes("PSV") === true) {
              console.log("skipping this one");
            } else {
              data.push(item);
            }
          }
        });
      this.setState({
        data: data,
      });
    }
    if (this.props.detailslist3 !== prevProps.detailslist3) {
      let data = this.state.data;
      let { detailslist3 } = this.props;
      detailslist3 &&
        detailslist3.data.map((item) => {
          let sku = String(item.sku);
          let name = String(item.name);
          let skuCheck = sku.slice(0, 2);
          if (item.is_visible === true) {
            if (skuCheck === "CS" && name.includes("PSV") === true) {
              console.log("skipping this one");
            } else {
              data.push(item);
            }
          }
        });
      this.setState({
        data: data,
      });
    }
    if (this.props.detailslist4 !== prevProps.detailslist4) {
      let data = this.state.data;
      let { detailslist4 } = this.props;
      detailslist4 &&
        detailslist4.data.map((item) => {
          let sku = String(item.sku);
          let name = String(item.name);
          let skuCheck = sku.slice(0, 2);
          if (item.is_visible === true) {
            if (skuCheck === "CS" && name.includes("PSV") === true) {
              console.log("skipping this one");
            } else {
              data.push(item);
            }
          }
        });
      this.setState({
        data: data,
      });
    }
    if (this.props.detailslist5 !== prevProps.detailslist5) {
      let data = this.state.data;
      let { detailslist5 } = this.props;
      detailslist5 &&
        detailslist5.data.map((item) => {
          let sku = String(item.sku);
          let name = String(item.name);
          let skuCheck = sku.slice(0, 2);
          if (item.is_visible === true) {
            if (skuCheck === "CS" && name.includes("PSV") === true) {
              console.log("skipping this one");
            } else {
              data.push(item);
            }
          }
        });
      this.setState({
        data: data,
      });
    }
    if (this.props.detailslist6 !== prevProps.detailslist6) {
      let data = this.state.data;
      let { detailslist6 } = this.props;
      detailslist6 &&
        detailslist6.data.map((item) => {
          let sku = String(item.sku);
          let name = String(item.name);
          let skuCheck = sku.slice(0, 2);
          if (item.is_visible === true) {
            if (skuCheck === "CS" && name.includes("PSV") === true) {
              console.log("skipping this one");
            } else {
              data.push(item);
            }
          }
        });
      this.setState({
        data: data,
      });
    }
    if (this.props.detailslist7 !== prevProps.detailslist7) {
      let data = this.state.data;
      let { detailslist7 } = this.props;
      detailslist7 &&
        detailslist7.data.map((item) => {
          let sku = String(item.sku);
          let name = String(item.name);
          let skuCheck = sku.slice(0, 2);
          if (item.is_visible === true) {
            if (skuCheck === "CS" && name.includes("PSV") === true) {
              console.log("skipping this one");
            } else {
              data.push(item);
            }
          }
        });
      this.setState({
        data: data,
      });
    }
    if (this.props.detailslist8 !== prevProps.detailslist8) {
      let data = this.state.data;
      let { detailslist8 } = this.props;
      detailslist8 &&
        detailslist8.data.map((item) => {
          let sku = String(item.sku);
          let name = String(item.name);
          let skuCheck = sku.slice(0, 2);
          if (item.is_visible === true) {
            if (skuCheck === "CS" && name.includes("PSV") === true) {
              console.log("skipping this one");
            } else {
              data.push(item);
            }
          }
        });
      this.setState({
        data: data,
      });
    }

    if (this.props.detailslist9 !== prevProps.detailslist9) {
      let data = this.state.data;
      let { detailslist9 } = this.props;
      detailslist9 &&
        detailslist9.data.map((item) => {
          let sku = String(item.sku);
          let name = String(item.name);
          let skuCheck = sku.slice(0, 2);
          if (item.is_visible === true) {
            if (skuCheck === "CS" && name.includes("PSV") === true) {
              console.log("skipping this one");
            } else {
              data.push(item);
            }
          }
        });
      this.setState({
        data: data,
      });
    }
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

  toggle3 = () => {
    let toggle3 = this.state.toggle3;
    this.setState({
      toggle3: !this.state.toggle3,
    });
  };
  checkEmail = (event) => {
    //prevents default action
    event.preventDefault();
    const { email, startDate, endDate } = this.state;
    this.props.dispatch({
      type: "CHECK_EMAIL",
      payload: {
        email: email,
        startDate: startDate,
        endDate: endDate,
      },
    });
    this.props.dispatch({
      type: "GET_SKUNUM_LIST",
    });
  };

  render() {
    const stockdata = this.state.data.map((item) => [
      item.name,
      item.sku,
      item.inventory_level,
      item.view_count,
    ]);
    const data = this.props.itemlist.map((item) => [
      item.email,
      item.order_number,
      Number(item.order_total).toFixed(2),
      item.qty,
      moment(item.created_at).add(6, "hours").format("MMM Do YY"),
    ]);
        const topdata = this.props.topfive.map((item) => [
          item.email,
          item.count
        ]);

    const totaldata = this.props.totallist.map((total) => [
      total.email,
      total.count,
    ]);
    const skunumdata = this.props.skunumlist
.map((skunum) => [skunum.sku, skunum.description, skunum.count]);
    return (
      <>
        <div>
          <div
            style={{ backgroundColor: "white", width: "20%", float: "left" }}
          >
            <img
              src="https://cdn11.bigcommerce.com/s-et4qthkygq/images/stencil/177x60/htwlogo_web_1573140308__59565.original.png"
              alt="HTW logo"
            ></img>
          </div>
          <div
            style={{ backgroundColor: "black", width: "80%", float: "right" }}
          >
            <div></div>
            <div style={{ height: 50, color: "white" }}>
            </div>
          </div>
          <br />
          <br />
          <center></center>
          <div style={{ padding: "1.5%" }}>
            <h1 style={{ textAlign: "center" }}>
              Top 5 Affilates within the last 30 days
            </h1>
            <MUITable2
              data={topdata} //brings in data as an array, in this case, list of items
              columns={[
                //names the columns found on MUI table
                { name: "Affiliate Email" },
                { name: "Total items sold" },
              ]}
              title={"Top 5 Affilates within the last 30 days"} //give the table a name
            />
          </div>
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
                          variant="contained"
                          color="primary"
                          onClick={(event) => {
                            event.preventDefault();
                            const itemArray = this.props.itemlist;
                            const item = itemArray[dataIndex];
                            const order_number = item.order_number;
                            this.setState({
                              toggle: !this.state.toggle,
                              order_number: order_number,
                            });
                            this.props.dispatch({
                              type: "ORDER_DETAILS",
                              payload: {
                                order_number: order_number,
                              },
                            });
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
          <div style={{ padding: "1.5%" }}>
            <h1 style={{ textAlign: "center" }}>
              Total Items Sold
            </h1>
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
              <>
                <h1>Select a Date Range</h1>
                <MuiPickersUtilsProvider utils={LuxonUtils}>
                  <Grid container justify="space-around">
                  {/* used to filter by date */}
                  <DatePicker
                  label="Start Date"
                  inputFormat="MM/dd/yyyy"
                  value={`${this.state.startDate.year}-${this.state.startDate.month}-${this.state.startDate.day}`}
                  onChange={(event) =>
                        this.setState({startDate: {year: event.c.year, month: event.c.month, day: event.c.day}})
                  }
                  renderInput={(params) => <TextField {...params} />}
                  />
                  </Grid>
                </MuiPickersUtilsProvider>
                <MuiPickersUtilsProvider utils={LuxonUtils}>
                  <Grid container justify="space-around">
                  <DatePicker
                  label="End Date"
                  inputFormat="MM/dd/yyyy"
                  value={`${this.state.endDate.year}-${this.state.endDate.month}-${this.state.endDate.day}`}
                  onChange={(event) =>
                    this.setState({endDate: {year: event.c.year, month: event.c.month, day: event.c.day}})
                  }
                  renderInput={(params) => <TextField {...params} />}
                  />
                  </Grid>
                </MuiPickersUtilsProvider>
              </>
              {this.state.startDate === null || this.state.endDate === null ? (
                <span></span>
              ) : this.state.startDate > this.state.endDate ? (
                <h1>Start Date can't be after the End Date</h1>
              ) : (
                <>
                  <h1>Select an Affiliate</h1>
                  <Form.Control
                    as="select"
                    onChange={(event) =>
                      this.setState({ email: event.target.value })
                    }
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
                        variant="contained"
                        color="primary"
                        type="submit"
                        style={{ width: "20%", margin: "2%" }}
                      >
                        Confirm Affiliate
                      </Button>
                    </center>
                  </Form>
                </>
              )}
            </center>
            <MUITable
              data={skunumdata} //brings in data as an array, in this case, list of items
              columns={[
                //names the columns found on MUI table
                { name: "SKU" },
                { name: "Description" },
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
                  height: "600px",
                  width: "400px",
                  zIndex: "1000000000",
                  border: "50px",
                  overflow: "scroll",
                  fontSize: "15px",
                  backgroundColor: "white",
                }}
                elevation="24"
                className="loginBox"
              >
                <div
                  style={{
                    backgroundColor: "white",
                  }}
                >
                  <table
                    style={{
                      marginLeft: "auto",
                      marginRight: "auto",
                      marginTop: "20px",
                      width: "100%",
                    }}
                  >
                    <tr>
                      <td
                        style={{
                          marginLeft: "3%",
                          padding: "10px",
                          width: "25%",
                        }}
                      >
                        {" "}
                        <Button
                          onClick={this.toggle}
                          variant="contained"
                          color="primary"
                          type="submit"
                        >
                          Close
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          marginLeft: "3%",
                          padding: "10px",
                          width: "25%",
                        }}
                      >
                        order details for{" "}
                        {this.props.detailslist[0] &&
                          this.props.detailslist[0].order_id}
                      </td>
                    </tr>
                    {this.props.detailslist.map((item, index) => {
                      let itemname = item.name;
                      let itemsku = item.sku;
                      let itemcost = Number(item.base_price).toFixed(2);
                      return (
                        <>
                          <tr>
                            <td
                              style={{
                                marginLeft: "3%",
                                padding: "10px",
                                width: "25%",
                              }}
                            >
                              Item: {index + 1}
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                marginLeft: "3%",
                                padding: "10px",
                                width: "25%",
                              }}
                            >
                              Name: {itemname}
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                marginLeft: "3%",
                                padding: "10px",
                                width: "25%",
                              }}
                            >
                              Sku: {itemsku}
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                marginLeft: "3%",
                                padding: "10px",
                                width: "25%",
                              }}
                            >
                              Price: {itemcost}
                            </td>
                          </tr>
                          {item.product_options.map((product, index) => {
                            let display_name = product.display_name;
                            let display_value = product.display_value;
                            return (
                              <>
                                <tr>
                                  <td
                                    style={{
                                      marginLeft: "3%",
                                      padding: "10px",
                                      width: "25%",
                                    }}
                                  >
                                    {display_name}: {display_value}
                                  </td>
                                </tr>
                              </>
                            );
                          })}{" "}
                          <br />
                          <br />
                        </>
                      );
                    })}{" "}
                  </table>
                  {/* toggles edit window back to not displaying */}
                  <Button
                    onClick={this.toggle}
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Close
                  </Button>
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                </div>
              </Paper>
            )}
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <Footer />
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  viewed: state.item.viewed,
  skulist: state.item.skulist,
  itemlist: state.item.itemlist,
  topfive: state.item.topfive,
  skunumlist: state.item.skunumlist,
  emaillist: state.item.emaillist,
  detailslist: state.item.detailslist,
  totallist: state.item.totallist,
  detailslist1: state.item.detailslist1,
  detailslist2: state.item.detailslist2,
  detailslist3: state.item.detailslist3,
  detailslist4: state.item.detailslist4,
  detailslist5: state.item.detailslist5,
  detailslist6: state.item.detailslist6,
  detailslist7: state.item.detailslist7,
  detailslist8: state.item.detailslist8,
  detailslist9: state.item.detailslist9,
});
export default connect(mapStateToProps)(App);
