import React, { useEffect, useRef, useState } from "react";
import "../screens/Home.css";
import { useDispatchCart,useCart } from "./ContextReducer";
const Cart = (props) => {

  const priceRef = useRef();
  let dispatch = useDispatchCart();
  let options = props.options;
  let priceOption = Object.keys(options);
  let data = useCart();
  const [qty,setQty] = useState(1)
  const [size,setSize] = useState("")
  const handleAddToCart = async ()=>{
      await dispatch({type:"ADD",id:props.foodItem._id,name:props.foodItem.name,price:finalPrice,qty:qty,size:size})
      console.log(data);
     
  }
  let finalPrice = qty* parseInt(options[size]);
  useEffect(()=>{
    setSize(priceRef.current.value)
  },[])
  return (
   
    <div>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
        <img
          src={props.foodItem.img}
          className="card-img-top"
          alt="MyImage"
          style={{ height: "120px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <div className="container">
            <select className="arrayClass c1 btn-primary rounded " onChange={(e)=>setQty(e.target.value)}>
              {Array.from(Array(6), (e, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>

            <select className="arrayClass btn-primary rounded" ref = {priceRef} onChange={(e)=>setSize(e.target.value)}>
              {priceOption.map((data) => (
                <option key={data} value={data}>
                  {data}
                </option>
              ))}
            </select>
            <div className="d-inline h-100 fs-5"> ₹{finalPrice} /- </div>
            <hr />
            <button className="btn btn-primary text-white mx-1 h-100 fs-6" onClick={handleAddToCart}>
              {" "}
              Add To Cart{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
