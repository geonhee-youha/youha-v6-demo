import { Box } from "@mui/material";
import youhaGrey from "../../constants/youhaGrey";

export default function Footer() {
    return <Box sx={{
        width: '100%',
        height: 400,
        borderTop: `1px solid ${youhaGrey[200]}`
    }}></Box>
}