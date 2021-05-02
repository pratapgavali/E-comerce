import React, {useState, useEffect} from 'react'
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base'
import { getOrders } from './helper/userapicalls';


export default function () {
    const [orders, setOrders] = useState([])
    const token = isAuthenticated().token;
    const userId = isAuthenticated().user._id;
    

    const preload = (userId, token) =>{
        getOrders(userId, token).then(data =>{
            console.log("Data is ", data);
            if(data.error){
                console.log("Erroroooooooooooooooo");
            }else{
                setOrders(data)
                
            }
        })
    }

useEffect(() => {
    preload(userId, token);

}, [])

    return (
        <Base>
            <div>
                <h1>User Orders</h1>
                <div className="row" >
                {orders.map(o=>{
                    return(
                        <div className="" >
                            <div className="">
                                {o.products.map(p=>{
                                    return(
                                        
                                        <div className="card bg-success p-4 m-5" >
                                            <div className="bg-white text-dark">
                                                <div class="card-body">
                                                    <h3 className="card-title bg-dark text-white p-2">Your Product</h3>
                                                    <p className="card-text ">Name: {p.name}</p>
                                                    <p className="card-text">Price: {p.price}$</p>
                                                    <p className="card-text">Quantity: {p.count}</p>
                                                    <p className="card-text">Status: {o.status}</p>
                                                    <a className="btn rounded btn-outline-danger btn-lg">Cancel</a>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
                </div>
            </div>
        </Base>
    )
}
