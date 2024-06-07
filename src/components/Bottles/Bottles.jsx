import { useEffect } from "react";
import { useState } from "react";
import Bottle from "../Bottle/Bottle";
import './Bottles.css'
import { addToLS, getStoredCart, removeFromLS } from "../../Utilities/localStorage";
import Cart from "../Cart/Cart";

const Bottles = () => {

const[bottles, setBottles] = useState([]);
const[cart, setCart] = useState([]);

useEffect(()=>{
    fetch('bottle.json')
    .then(res => res.json())
    .then(data =>setBottles(data))
}, [])

// Load Cart from local storage

useEffect(()=>{
    if(bottles.length){
        const storedCart = getStoredCart();
        const savedCart = [];
        for(const id of storedCart){
            console.log(id);
            const bottle = bottles.find(bottle => bottle.id === id);
            if(bottle){
savedCart.push(bottle);
            }
        }
        console.log('saved Cart', savedCart);
        setCart(savedCart)
    }
    
},[bottles])


const handleAddToCart = bottle =>{
    const newCart = [...cart, bottle];
    setCart(newCart);
    addToLS(bottle.id)

}

const handleRemoveFromCart = id =>{
// Remove from visual Cart

const remainingCart = cart.filter(bottle => bottle.id !== id);
setCart(remainingCart);
// Remove from local storage

removeFromLS(id);
}

    return (
        <div>
            <h1>Bottles Available : {bottles.length}</h1>
            <Cart cart={cart} handleRemoveFromCart={handleRemoveFromCart}></Cart>
           <div className="bottle-container">
           {
                bottles.map(bottle => <Bottle
                     key={bottle.id}
                      bottle={bottle}
                      handleAddToCart={handleAddToCart}
                      ></Bottle>)
            }
           </div>
        </div>
    );
};

export default Bottles;