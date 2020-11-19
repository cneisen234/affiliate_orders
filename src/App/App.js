import React, { Component } from "react";
import "./App.css";
import MUITable from "../MUITable.js";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import moment from "moment";
import { Paper, TextField } from "@material-ui/core";

class App extends Component {
  state = {
    toggle: false,
    id: "",
    sku: "",
    email: "",
  };
  componentDidMount() {
    this.props.dispatch({
      type: "GET_ITEM_LIST",
    });
      this.props.dispatch({
        type: "GET_SKU_LIST",
      });
        this.props.dispatch({
          type: "GET_OPTION_LIST",
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

  startAllItem = (event) => {
    //prevents default action
    event.preventDefault();
    const { qty, item } = this.state;
    this.props.dispatch({
      type: "START_ALL_ITEM",
      payload: {
        id: this.state.id,
        brand: this.state.brand,
        qty: this.state.qty,
        sku: this.state.sku,
        sku_description: this.state.sku_description,
      },
    });
    this.props.dispatch({
      type: "EDIT_ITEM",
      payload: {
        id: this.state.id,
        qty: 0,
      },
    });
    this.setState({
      toggle2: false,
    });
  };

  startItem = (event) => {
    //prevents default action
    event.preventDefault();
    const { qty, item } = this.state;
    this.props.dispatch({
      type: "START_ALL_ITEM",
      payload: {
        id: this.state.id,
        brand: this.state.brand,
        qty: this.state.updated_qty,
        sku: this.state.sku,
        sku_description: this.state.sku_description,
      },
    });
    this.props.dispatch({
      type: "EDIT_ITEM",
      payload: {
        id: this.state.id,
        qty: this.state.qty - this.state.updated_qty,
      },
    });
    this.setState({
      toggle2: false,
    });
  };

  //This function handles storing input values into state on change
  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };
  render() {
    const data = this.props.itemlist.map((item) => [
      item.email,
      item.order_number,
      item.qty,
      moment.utc(item.created_at).format("MMMM Do YYYY"),
    ]);

      const skudata = this.props.skulist.map((sku) => [
        sku.email,
        sku.order_number,
        sku.sku,
        moment.utc(sku.created_at).format("MMMM Do YYYY"),
      ]);
       const optiondata = this.props.optionlist.map((option) => [
         option.email,
         option.order_number,
         option.sku,
         option.product_options,
         moment.utc(option.created_at).format("MMMM Do YYYY"),
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
        <br />
        <center>
          <h1>Affiliate Order History</h1>
        </center>
        <div style={{ padding: "1.5%" }}>
          <MUITable
            data={data} //brings in data as an array, in this case, list of items
            columns={[
              //names the columns found on MUI table
              { name: "Affiliate Email" },
              { name: "Order Number" },
              { name: "Number of items sold" },
              { name: "Date of Sale" },
            ]}
            title={"Record of Sales"} //give the table a name
          />
        </div>
        <br />
        <br />
        <br />
        <div style={{ padding: "1.5%" }}>
          <MUITable
            data={skudata} //brings in data as an array, in this case, list of items
            columns={[
              //names the columns found on MUI table
              { name: "Affiliate Email" },
              { name: "Order Number" },
              { name: "SKU" },
              { name: "Date of Sale" },
            ]}
            title={"List of SKUs sold by Affilate"} //give the table a name
          />
        </div>
        <br />
        <br />
        <br />
        <div style={{ padding: "1.5%" }}>
          <MUITable
            data={optiondata} //brings in data as an array, in this case, list of items
            columns={[
              //names the columns found on MUI table
              { name: "Affiliate Email" },
              { name: "Order Number" },
              { name: "SKU" },
              { name: "Product Options" },
              { name: "Date of Sale" },
            ]}
            title={"Product Options by SKU"} //give the table a name
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
        </div>
        <br />
        <br />
        <br />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  itemlist: state.item.itemlist,
  skulist: state.item.skulist,
  optionlist: state.item.optionlist,
  skunumlist: state.item.skunumlist,
  emaillist: state.item.emaillist,
  totallist: state.item.totallist,
});
export default connect(mapStateToProps)(App);
