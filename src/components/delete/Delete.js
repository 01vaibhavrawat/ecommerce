import * as React from 'react';
import Button from '@mui/material/Button';
import { error, success } from '../../App';

export default function AddProd({ deleteFunction, close }) {

    return (
        <div>
            <div id="addNewUserForm">
                <p id="delete-modal-heading">Are you sure you want to delete?</p>
                <Button id="cancelDeleteButton" variant="contained" onClick={() => close()}>Cancel</Button>
                <Button id="yesDeleteButton" variant="contained" onClick={() => deleteFunction()}>Yes</Button>
            </div>
        </div >
    );
}