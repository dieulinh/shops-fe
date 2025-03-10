import {Trash2Icon} from "lucide-react";

"lucide-react"
export default function CartItem({item, onQuantityChange, onRemoveItem}) {

  const handleChange = (event) => {
    onQuantityChange(parseInt(event.target.value));
  };
  const removeItem = () => {
    onRemoveItem(item.id)
  }
  return (<>
    <div>{item.name}</div>
    <div><input type={"number"} onChange={handleChange} value={item.quantity}/></div>
    <div>{item.price}</div>
    <button onClick={removeItem} className="remove-btn"><Trash2Icon /></button>
  </>)
}