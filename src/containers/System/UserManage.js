import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManager.scss";
import { getAllUsers } from "../../services/userServices";
import ModalUser from "./ModalUser";
class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: []
        };
    }

    async componentDidMount() { 
        let response = await getAllUsers('ALL');
        if(response && response.errCode ===0){
            this.setState({
                arrUsers : response.users
            }, () => {
                console.log('check state user 2 ', this.state.arrUsers); // []
            })
            console.log('check state user 1 ', this.state.arrUsers); // []
        }
        // console.log('get user from node.js: ', response);
    }

    handleAddNewUser = () => {
        alert('click me')
    }

    render() {
        console.log('check render', this.state);
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
            <ModalUser></ModalUser>
                <div className="title text-center">Manager users with Tuan</div>
                <div className="mx-1">
                    <button className="btn btn-primary px-3" onClick={()=>this.handleAddNewUser()}><i className="fas fa-plus me-1"></i>Add new users</button>
                </div>
                <div className="users-table mt-4 mx-1">
                    <table id="customers">
                        <tr>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Address</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                            {arrUsers && arrUsers.map((item,index) => {
                                return (
                                    <tr>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>{item.email}</td>
                                        <td>
                                            <button className="btn-edit"><i className="fas fa-pencil-alt"></i></button>
                                            <button className="btn-delete"><i className="fas fa-trash"></i></button>
                                        </td>

                                    </tr>
                                )
                            })}
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
