/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import gql from 'graphql-tag';
import { withRouter } from 'react-router';
import { graphql, Query } from 'react-apollo';
import { connect } from 'react-redux';
import compose from "lodash.flowright";

import Card from "components/Card/Card.jsx";
import Button from 'components/CustomButton/CustomButton.jsx';

import { itemThArray } from "variables/Variables.jsx";
import {FormInputs} from '../components/FormInputs/FormInputs.jsx'
import { saveItems, openModal, closeModal } from '../actions.js';

const getItemsQuery = gql`
 {
    items{
      id,
      title,
      quantity,
      quantity_sold,
      cost,
      price,
      is_available
    }
  }
`;

class TableList extends Component {
   constructor(props) {
    super(props);
     this.state = {
       selectedItem: null,
       quantity: null,
       cost: null,
       price: null,
       title: null,
       loading: false,
       errors: null,
       inStockModalOpen: false,
       addItemModalOpen: false,
       refetchFn: null,
       is_edit: false
     };
   }

  openInStockModal = (item, refetchFn) => {
    this.props.openModalDispatcher();
    this.setState({selectedItem: item,
                   inStockModalOpen: true,
                   price: item.price,
                   cost: item.cost,
                   refetchFn: refetchFn});
  }

  openNewItemModal = (refetchFn) => {
    this.props.openModalDispatcher();
    this.setState ({addItemModalOpen: true,
                    refetchFn: refetchFn,
                    title: '',
                    selectedItem: null,
                    is_edit: false});
  }

  openEditItemModal = (item, refetchFn) => {
    this.props.openModalDispatcher();
    this.setState ({addItemModalOpen: true,
                    refetchFn: refetchFn,
                    title: item.title,
                    selectedItem: item,
                    is_edit: true});
  }

  closeModal = () => {
    this.props.closeModalDispatcher();
    this.setState({selectedItem: null,
                   inStockModalOpen: false,
                   addItemModalOpen: false
                  });
  }

  submitItem = () => {
    if(this.state.is_edit)
      this.props.editItemMutation({variables: {id: this.state.selectedItem.id,
                                               title: this.state.title}})
      .then((response) => {
        if (!response.errors || response.errors.length <= 0){
          this.state.refetchFn(getItemsQuery);
          this.closeModal();
        }else{
          this.setState({
            errors: response.data.login.erros
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    else
      this.props.newItemMutation({variables: {title: this.state.title}})
      .then((response) => {
        if (!response.errors || response.errors.length <= 0){
          this.state.refetchFn(getItemsQuery);
          this.closeModal();
        }else{
          this.setState({
            errors: response.data.login.erros
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  submitStockIn = () => {
    this.props.stockInMutation({variables: {id: this.state.selectedItem.id,
                                            price: parseFloat(this.state.price),
                                            cost: parseFloat(this.state.cost),
                                            quantity: parseInt(this.state.quantity)}})
      .then((response) => {
        if (!response.errors || response.errors.length <= 0){
          this.state.refetchFn(getItemsQuery);
          this.closeModal();
        }else{
          this.setState({
            errors: response.data.login.errors
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteItem = (item, refetch) => {
    this.props.deleteItemMutation({variables: {id: item.id}})
      .then ((response) => {
        if (!response.errors || response.errors.length <= 0){
          refetch(getItemsQuery);
        }else{
          this.setState({
            errors: response.data.login.errors
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
      
  
  
  render() {
    let { inStockModalOpen, addItemModalOpen, selectedItem, price, cost, title, is_edit } = this.state;
    let modalTitle = selectedItem ? selectedItem.title : "";

    const renderItemModal = () => {
      if(addItemModalOpen){
        return <Card
        title={ is_edit? "Edit Item" : "Add Item"}
        content = {
            <div>
              <FormInputs
                ncols= {["col-md-12"]}
                properties = {[
                {name: "title",
                label: "Title",
                type: "text",
                placeholder: "Title",
                bsClass: "form-control",
                defaultValue: is_edit? title : '',
                onChange: (event) => {this.setState({title: event.target.value});}
                }]}/>
              <div className="row">
                <div className="col-md-12">
                  <div className="pull-right btn-group">
                    <Button
                      bsStyle="secondary"
                      onClick ={ () => this.closeModal() }>Cancel</Button>
                    <Button
                      bsStyle="primary"
          onClick ={ () => this.submitItem() } >{ is_edit? "Update" : "Create" }</Button>
                  </div>
                </div>
              </div>
            </div>
        }
          />
      }
    }
          const renderInStockModal = () => {
      if(inStockModalOpen){
        return  <Card
        title={"Stock in " + modalTitle }
        content={
            <div>
            <FormInputs
          ncols = {["col-md-4", "col-md-4", "col-md-4"]}
          properties ={[
            {
              name: "quantity",
              label: "Quantity",
              type: "numeric",
              placeholder: "Quantity",
              bsClass: "form-control",
              onChange: (event) => {this.setState({quantity: event.target.value});}
            },
            {
              name: "cost",
              label: "Cost",
              type: "numeric",
              placeholder: "Cost",
              defaultValue: cost,
              bsClass: "form-control",
              onChange: (event) => {this.setState({cost: event.target.value});}
            },
            {
              name: "price",
              label: "Price",
              type: "numeric",
              placeholder: "Price",
              defaultValue: price,
              bsClass: "form-control",
              onChange: (event) => {this.setState({price: event.target.value});}
            }
          ]}
            />
            <div className="row">
              <div className="col-md-12">
                <div className="pull-right btn-group">
                  <Button
                    bsStyle="secondary"
                    onClick ={ () => this.closeModal() }>Cancel</Button>
                  <Button
                    bsStyle="primary"
                    onClick ={ () => this.submitStockIn() } >Add to Stock</Button>
                </div>
              </div>
            </div>
            </div>
        }
          />
      }
    }
    
    return (
      <div className="content">
        <div className={ inStockModalOpen || addItemModalOpen ? "modal show" : "modal fade"}>
          <div className="modal-content top-padding col-md-6 col-md-offset-3">
            { renderInStockModal() }
            { renderItemModal () }
          </div>
        </div>
        <Query query={ getItemsQuery } notifyOnNetworkStatusChange={ true }>
          { response => {
            if(response.loading || response.networkStatus === 4){
              return <div>Loading....</div>;
            }
            if(response.error){
              return <div>Error:{response.error} </div>
            }
            return(
              <div>
              <Grid fluid>
                <Row>
                  <div className="col-md-12">
                    <Button
                      bsStyle="primary pull-right"
                      onClick= { () => this.openNewItemModal(response.refetch)}>Add new Item</Button>
                  </div>
                </Row>
                <Row>
                  <Col md={12}>
                    <Card
                      title="Inventory"
                      ctTableFullWidth
                      ctTableResponsive
                      content={
                          <Table striped hover>
                          <thead>
                              <tr>
                                  {itemThArray.map((prop, key) => {
                                    return <th key={key}>{prop}</th>;
                                  })}
                        </tr>
                          </thead>
                            <tbody>
                              {response.data.items.map((item, key) => {
                                return (
                                  <tr key={item.id}>
                                    <td>{item.title}</td>
                                    <td>{item.cost}</td>
                                    <td>{item.price}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.quantity_sold}</td>
                                    <td className={item.is_available ? "fa fa-check": "fa fa-close" }></td>
                                    <td>
                                      <i className="fa fa-trash"
                                         onClick = {() => this.deleteItem(item, response.refetch)}>
                                      </i>
                                      <i className="fa fa-plus"
                                         onClick = { () => this.openInStockModal(item, response.refetch)}>
                                      </i>
                                      <i className="fa fa-pencil"
                                         onClick = { () => this.openEditItemModal(item, response.refetch)}>
                                      </i>
                                    </td> 
                                  </tr>
                                );
                              })}
                        </tbody>
                          </Table>
                      }/>
                </Col>
                </Row>
                </Grid>
                </div>)
          }}
      </Query>
        </div>
    );
  }
}

const stockInMutation = gql`
  mutation stockIn($id: ID!, $quantity: Int!, $cost: Float!, $price: Float!) {
    stockIn(id: $id, quantity: $quantity, cost: $cost, price: $price)
  }
`;

const newItemMutation = gql`
  mutation newItem($title: String!) {
    newItem(title: $title)
  }
`;

const editItemMutation = gql`
  mutation editItem($id: ID!, $title: String!) {
    editItem(id: $id, title: $title)
  }
`;

const deleteItemMutation = gql`
  mutation deleteItem($id: ID!) {
    deleteItem(id: $id){ 
      message
    }
  }
`;

const stockInWithData = compose(
  graphql(stockInMutation, { name: "stockInMutation" }),
  graphql(newItemMutation, { name: "newItemMutation"}),
  graphql(editItemMutation, { name: "editItemMutation" }),
  graphql(deleteItemMutation, { name: "deleteItemMutation" })
)(withRouter(TableList));

const mapDispatchToProps = (dispatch) => ({
  openModalDispatcher() {
    dispatch(openModal())
  },
  closeModalDispatcher() {
    dispatch(closeModal())
  }
});

const TableListWithState = connect(
  null,
  mapDispatchToProps
)(stockInWithData);

export default TableListWithState;
