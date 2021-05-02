import React from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper'
import Base from '../core/Base'

const UserDashBoard = () => {
    const name = isAuthenticated().user.name;
    const email = isAuthenticated().user.email;

    return (
        <Base title="Welcome" name={name} >
            
            <div className="container" >
                <div className="row " >
                    <div className="col-6 card bg-success mb-4 p-4 " >
                        <div className="card-header bg-dark" > Information </div>
                        <ul className="list-group bg-dark" >
                            <li className="list-group-item text-dark" >
                                <span className="badge badge-success mr-2" >Name</span>: {name}
                            </li>

                            <li className="list-group-item text-dark " >
                                <span className="badge badge-success mr-2" >Email</span>: {email}
                            </li>
                            <li className="list-group-item" >
                                <span className="badge badge-danger" >User Area</span>
                            </li>
                        </ul>
                    </div>

                    <div className="col-6" >

                        <div className="card bg-success mb-4 p-4" >
                            <div className="card-header bg-dark" >Account Settings & Order Details</div>
                            <ul className="bg-white p-4 d-flex justify-content-between ">
                                <Link to="/user/orders" className="btn rounded btn-outline-info btn-lg mt-4 p-2 mr-4" >Orders</Link>
                                <Link to="/cart" className="btn rounded btn-outline-info btn-lg mt-4 p-2 mr-4" >Go To Cart</Link>
                                {/* <Link to="/user/edit" className="btn rounded btn-outline-info btn-lg mt-4 p-2 mr-4" >Edit Profile</Link> */}
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
            
        </Base>
    )
}

export default UserDashBoard;
