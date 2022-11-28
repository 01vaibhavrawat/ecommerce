import { Box, Button, Tooltip, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";  
import { useNavigate } from "react-router-dom";

const TableHeader = ({ handleModalOpen, parent }) => {

    let navigate = useNavigate();

    return (
        <Box className="tableheader">
            <Box className="title">
                <p>
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        {parent}
                    </Typography>
                </p>
            </Box>
            <Box className="serchbox"
                sx={{ width: '100%' }}>
                <Tooltip title="Search Data" arrow>
                    <input
                        type="text"
                        placeholder="Search"
                    />
                </Tooltip>
            </Box>
            <Box sx={{ width: '70%' }}>
                <Button id="addProdBtn2"
                    onClick={() => {
                        handleModalOpen();
                    }}>
                    Add new product
                </Button>
            </Box>
        </Box>
    );
};

export default TableHeader;