export default function CartItem({item, onQuantityChange}) {

  const handleChange = (event) => {
    onQuantityChange(parseInt(event.target.value));
  };
  return (<>
    <div>{item.name}</div>
    <div><input type={"number"} onChange={handleChange} value={item.quantity}/></div>
    <div>{item.price}</div>
    <button className="remove-btn">Remove</button>
  </>)
}