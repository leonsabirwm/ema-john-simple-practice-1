import React, { useEffect, useState } from 'react';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

let grandTotal = 0;
let total = 0;
let shipping = 0;
const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect( () =>{
        fetch('products.json')
        .then(res=> res.json())
        .then(data => setProducts(data))
    }, []);

    useEffect(() => {

        //I did it wrong ------
    // let newCart = [];

    //     const storedCart = localStorage.getItem('shopping-cart');
    //     if(storedCart){
    //      let   parseStoredCart = JSON.parse(storedCart);
    //     //   newCart = [...parseStoredCart]  ;
    //     for(const productid in parseStoredCart){
    //         // console.log(product)
    //     const  newCartItem = products.find(pdt => pdt.id === productid);
        
    //     console.log(newCartItem);
    //     newCart.push(newCartItem);
    //     }
    //     // console.log(newCart);
    //     setCart(newCart);
    //     };

    //correct portion is here
        const storedCart = getStoredCart();
        // const savedCart = [];
        // for(const id in storedCart){
        //     const addedProduct = products.find(product => product.id === id);
        //     if(addedProduct){
        //         const quantity = storedCart[id];
        //         addedProduct.quantity = quantity;
        //         savedCart.push(addedProduct);
        //     }
        // }
        // setCart(savedCart);


    const savedCart = [];
    for(const id in storedCart){
    const  addedItem = products.find(product => product.id ===id);
    if(addedItem){

        let quantity = storedCart[id];
        addedItem.quantity = quantity;
        savedCart.push(addedItem);
    }
    }
    setCart(savedCart);
    },[products]);
    

    const handleAddToCart = (product) =>{
        addToDb(product.id);
        // do not do this: cart.push(product);
        const newCart = [...cart, product];
        setCart(newCart);
        for(product of cart){
            total = total + product.price;
            shipping = shipping + product.shipping;
            grandTotal = total + shipping;
        }
    }
    // console.log(`---${cart}`)
    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product=><Product 
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                        ></Product>)
                }
            </div>
            <div className="cart-container">
               <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;