import {createContext, useContext, useState, useEffect} from "react";
import toast from "react-hot-toast";
import {object} from "prop-types";
import product from "../components/Product";

const Context = createContext("default context");

export function StateContext({children}:any) {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);
    let foundProduct:any;

    const onAdd = (product: { _id: any; price: number; quantity: any; name: any; }, quantity: number) => {
        const checkProductInCart = cartItems.find((item:any) => item._id === product._id);
        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
        if(checkProductInCart) {
            const updatedCartItems = cartItems.map((cartProduct:any) => {
                if(cartProduct._id === product._id) {
                    return {
                        ...cartProduct,
                        quantity: cartProduct.quantity + quantity
                    }
                }
            });
            // @ts-ignore
            setCartItems(updatedCartItems);
        } else {
            product.quantity = quantity;
            // @ts-ignore
            setCartItems([...cartItems, {...product}]);
        }
        toast.success(`${qty} ${product.name} added to cart.`);
    }

    const onRemove = (product: { _id: any; }) => {
        // @ts-ignore
        foundProduct = cartItems.find((item) => item._id === product._id);
        // @ts-ignore
        const newCartItems = cartItems.filter((item) => item._id !== product._id);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - Number((foundProduct.price * foundProduct.quantity).toFixed(2)));
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity);
        setCartItems(newCartItems);
    }

    const toggleCartItemQuantity = (id:string|number, value:string|number) => {
        // @ts-ignore
        foundProduct = cartItems.find((item) => item._id === id);
        // let index = cartItems.findIndex((product) => product._id === id);
        // const newCartItems = cartItems.filter((item) => item._id !== id);
        if(value === 'inc') {
            // setCartItems([...newCartItems, {...foundProduct, quantity:foundProduct.quantity + 1}]);
            // @ts-ignore
            setCartItems( prevCartItems => prevCartItems.map((item) => {
                    // @ts-ignore
                if (item._id === id){
                        // @ts-ignore
                    return {...item, quantity: foundProduct.quantity + 1}
                    }
                    return item
                })
            );
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
            setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1)
        }else if(value === 'dec') {
            if(foundProduct.quantity > 1) {
                // setCartItems([...newCartItems, {...foundProduct, quantity:foundProduct.quantity - 1}]);
                // @ts-ignore
                setCartItems( prevCartItems =>
                    prevCartItems.map( item => {
                        // @ts-ignore
                        if (item._id === id){
                            // @ts-ignore
                            return {...item, quantity: foundProduct.quantity - 1}
                        }
                        return item
                    })
                );
                setTotalPrice((prevTotalPrice) => Number((prevTotalPrice - foundProduct.price).toFixed(2)));
                setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
            }
        }
    }

    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    }
    const decQty = () => {
        setQty((prevQty) => {
            if (prevQty - 1 < 1) return 1;
            return prevQty - 1;
        })
    }

    return (
        // @ts-ignore
        <Context.Provider value={{
            showCart,
            setShowCart,
            cartItems,
            setCartItems,
            totalPrice,
            setTotalPrice,
            totalQuantities,
            setTotalQuantities,
            qty,
            incQty,
            decQty,
            onAdd,
            toggleCartItemQuantity,
            onRemove
        }}>
            {children}
        </Context.Provider>
    )
}

export function useStateContext() {
    return useContext(Context);
}