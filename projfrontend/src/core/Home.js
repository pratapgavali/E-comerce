import React, {useState, useEffect} from 'react'
import '../styles.css'
import {API} from '../backend'
import Base from './Base';
import Card from './Card';
import { getProducts } from './helper/coreapicalls';

export default function Home() {

    const [products, setproducts] = useState([])

    const [error, seterror] = useState(false)

    const loadAllProduct = () => {
        getProducts().then(data => {
            if(data.error){
                seterror(data.error)
            }else{
                setproducts(data);
            }
        })
    }

    useEffect(() => {
        loadAllProduct()
    }, [])

    console.log("API IS", API);
    return (
        <Base title="" description="Welcome to the Tshirt store" >
            
            <div className="row text-center " >
                
                <div className="row" >
                    {products.map((product, index) => {
                        return(
                            <div key={index} className="col-4 mb-4" >
                                <Card product={product} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </Base>
    );
}
