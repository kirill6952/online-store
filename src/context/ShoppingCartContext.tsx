import {createContext, ReactNode, useContext, useState} from "react";
import storeItems from "../data/item.json"
import {Cart} from "../components/Cart.tsx";
import {useLocalStorageHook} from "../localStorage/useLocalStorageHook.ts";

type ShoppingCartContext = {
 searchTerm: string;
 setSearchTerm: (search: string)=> void;
 filteredItems: StoreItem[];
 setFilteredItems: (items: StoreItem[]) => void

    cartItems: CartItem[];
    cartQuantity: number;
    getItemQuantity: (id: number) => number;
    increaseCartQuantity: (id: number) => void;
    decreaseCartQuantity: (id: number) => void;
    removeCartQuantity:(id:number) => void;

    openCart:() => void;
    closeStoreList:() => void;

}
type ShoppingCartProviderProps = {
    children: ReactNode
}

type StoreItem = {
    id: number;
    name: string;

}
type CartItem = {
    id: number;
    quantity: number;

}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart(){
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider ({children}: ShoppingCartProviderProps) {

    const [searchTerm, setSearchTerm]= useState('')
    const [filteredItems,setFilteredItems]= useState<StoreItem[]>(storeItems)
    const [cartItems,setCartItems]= useLocalStorageHook<CartItem[]>(
         'shoppingCart',
         [],
    )
    const [isOpen, setIsOpen] = useState(false)

    const openCart = () => setIsOpen(true);

    const closeCart = () => setIsOpen(false);





    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity,
        0
   )

    function getItemQuantity(id: number) {

        return cartItems.find(item => item.id === id)?.quantity || 0
    }


    function increaseCartQuantity(id: number) {

        setCartItems(currItems => {
            if(currItems.find(item => item.id === id) == null) {
                return [...currItems, {id, quantity: 1}]
            } else {
                return currItems.map(item => {
                    if(item.id === id) {
                        return {...item, quantity: item.quantity + 1}
                    } else {

                        return item
                    }
                })
            }
        })
    }

    function decreaseCartQuantity(id:number){
            setCartItems(currItems => {
                if(currItems.find(item => item.id === id)?.quantity === 1){
                    return currItems.filter(item => item.id !== id)
                }else {
                   return  currItems.map(item => {
                        if(item.id === id) {
                            return {...item, quantity: item.quantity - 1}
                        }else{
                            return item
                        }
                    })
                }
    })
    }

    function removeCartQuantity(id:number){
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
    }






    return(
        <ShoppingCartContext.Provider value={{
            searchTerm,
            setSearchTerm,
            filteredItems,
            setFilteredItems,

            cartQuantity,
            cartItems,
            getItemQuantity,
            increaseCartQuantity,
            decreaseCartQuantity,
            removeCartQuantity,

            openCart,
            closeStoreList: closeCart,



        }}
            >

            {children}

                <Cart isOpen={isOpen}/>

            </ShoppingCartContext.Provider>

    )
}