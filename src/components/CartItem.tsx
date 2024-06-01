import {useShoppingCart} from "../context/ShoppingCartContext.tsx";
import storeItems from "../data/item.json"
import Stack from 'react-bootstrap/Stack';
import {Button} from "react-bootstrap";
import {formatterCurrency} from "../currency/currencyFormater.ts";
import {MdDeleteForever} from "react-icons/md";

type CartItemProps = {
    id: number
    quantity: number
}


export function CartItem({id, quantity}: CartItemProps){                                                    // явная вертикальная передача пропса, от родительского к дочернему

    const {removeCartQuantity,increaseCartQuantity, decreaseCartQuantity} = useShoppingCart();                                                                // вертикальная передача пропс из контекста (провайдер), где уже все типизированно

    const item = storeItems.find(i => i.id === id)

    if (item == null) return null;




//&times; krestik
    return(
        <Stack direction="horizontal" gap={3} className='d-flex align-items-center'>
            <img src={item.imgUrl} style={{width: "70px", height: "70px"}}/>
            <div className='me-auto'>
                <div>
                    {item.name}{' '}{quantity > 1 && (
                    <span
                        className='text-muted'
                        style={{fontSize: '.9rem'}}
                    >
                            x{quantity}
                        </span>
                )}
                </div>

                <div
                    className="text-muted"
                    style={{fontSize: '.9rem'}}
                >
                    {formatterCurrency(item.price)}
                </div>

            </div>

            <div>
                {formatterCurrency(item.price * quantity)}
            </div>


            <div className="d-flex align-items-center justify-content-center" style={{gap: '0.5rem'}}>

                <Button variant="outline-secondary" size="sm" className="btn-sm border-0" onClick={() => decreaseCartQuantity(id)}>&minus;</Button>
                <span className="fs-5">{quantity}</span>
                <Button variant="outline-secondary" size="sm" className="btn-sm border-0" onClick={() => increaseCartQuantity(id)}>&#43;</Button>

                <Button variant="outline-danger" onClick={() => removeCartQuantity(id)} className=" border-0">
                    <MdDeleteForever style={{ fontSize: '24px' }} />
                </Button>
            </div>
        </Stack>
    )
}