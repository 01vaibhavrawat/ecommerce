import * as React from 'react';
import { error, success } from '../../App';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";

export default function Products() {

  const dispatch = useDispatch();

  const [data, setData] = React.useState([]);

  const loadAllProducts = () => {
    fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>{
              console.log(json);
              setData(json);
            })
  }

  React.useEffect(() => {
    loadAllProducts();
  }, [])

  return (
    <React.Fragment>
        <Grid container spacing={3}>
          {data.map((product)=>{
            return(
              <Grid item xs={12} sm={3}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={product.image}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {product.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">${product.price}</Button>
                    <Button size="small" onClick={()=>{
                      let obj = {name:"", price: ""};
                      obj.name = product.title;
                      obj.price = product.price;
                      dispatch(addProduct(obj));
                      success("Added product to cart")
                    }}>Add to cart</Button>
                  </CardActions>
                </Card>
            </Grid>
              )
        })}
        </Grid>
    </React.Fragment>
  );
}