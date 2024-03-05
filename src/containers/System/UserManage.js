import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManager.scss";
import { getAllUsers } from "../../services/userServices";
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

    render() {
        console.log('check render', this.state);
        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                <div className="title text-center">Manager users with Tuan</div>
                <div className="users-table mt-4 mx-3">
                    <table id="customers">
                        <tr>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Address</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                            {arrUsers && arrUsers.map((item,index) => {
                                console.log('tuan check map', item, index)
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
