import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { useDispatch, useSelector } from "react-redux";
import { removeProduct, clearCart } from "../../redux/cartSlice";

const style = {
  width: '100%',
  maxWidth: 360,
  bgcolor: 'background.paper',
};

export default function ListDividers() {

  const items = useSelector((state) => state.cart.arr)
  const dispatch = useDispatch()
  let [total, setTotal] = React.useState(0);

  return (
    <React.Fragment>
    <List sx={style} component="nav" aria-label="mailbox folders">
      {items.map((item, index)=>{
          total += item.price;
        return(
          <React.Fragment>
          <ListItem key={index} button>
            <ListItemText primary={item.name} />
            <ListItemText primary={item.price} />
            <ListItemText onClick={()=> dispatch(removeProduct(index))} sx={{marginLeft: 10}} primary="remove item" />
          </ListItem>
          <Divider />
          </React.Fragment>
          )
      })}

          <ListItem button>
            <ListItemText primary="Cart total" />
            <ListItemText primary={total} />
          </ListItem>
    </List>
    <button onClick={()=> {
      dispatch(clearCart());
      window.alert("your purchase was successful")
    }}>Checkout</button>
    </React.Fragment>
  );
}