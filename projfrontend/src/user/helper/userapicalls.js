import { API } from "../../backend"

export const getOrders = (userId, token) => {

    return fetch(`${API}/orders/user/${userId}`,{
        method: "GET",
        headers: {
        Accept: "application/json",
        "Content-Type":"application/json",
        Authorization: `Bearer ${token}`
        }
    }).then(responce=>{
        console.log("INSIDE THEN ",responce);
        return responce.json();
    })
    .catch(err => console.log(err));
    
}