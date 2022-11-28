import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { error, success } from '../../../App';
import Loader from '../../loader/Loader';

export default function AddProduct({ close }) {


  const [showLoader, setShowLoader] = React.useState(false);
  const [data, setData] = React.useState(
                 {
                    title: '',
                    price: '',
                    description: '',
                    image: '',
                    category: ''
                }
                )

  const handleSubmit = () => {
    if (validation()) {
      setShowLoader(true);
      fetch('https://fakestoreapi.com/products',{
            method:"POST",
            body:JSON.stringify(
               data
            )
        })
            .then(res=>{
              if(!res.status == 'ok'){
                error();
                setShowLoader(false);
            }else{
              res.json();
              setShowLoader(false);
              close();
              success('Successfully added product');
            }
            })
            .then(json=>console.log("added product >", json))
    }
  }

  const validation = () => {
    return true;
  }

  const handleChange = (event) => {
    let updatedValue = {};
    updatedValue[event.target.name] = event.target.value;
    setData({
      ...data,
      ...updatedValue,
    });
  };

  return (
    <div>

      {showLoader && <Loader />}

      <div id="addNewUserForm">
        <p id="modal-heading">Add new product</p>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={6}>
            <TextField
              required
              id="title"
              name="title"
              label="Title"
              fullWidth
              variant="outlined"
              value={data.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <TextField
              required
              id="price"
              name="price"
              label="Price"
              fullWidth
              variant="outlined"
              value={data.price}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              id="description"
              name="description"
              label="Description"
              fullWidth
              variant="outlined"
              value={data.description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <TextField
              id="image"
              name="image"
              label="Image"
              fullWidth
              variant="outlined"
              value={data.image}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <TextField
              required
              id="category"
              label="Category"
              name="category"
              fullWidth
              variant="outlined"
              value={data.category}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Button id="newCategorySubmit" variant="contained" onClick={() => handleSubmit()}>Submit</Button>
        <Button id="modalCancel" variant="contained" onClick={() => close()}>Cancel</Button>
      </div>
    </div>
  );
}