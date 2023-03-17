import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function Footer() {
    return <Box sx={{
        width: '100%',
        height: 400,
        borderTop: `1px solid ${grey[300]}`
    }}></Box>
}