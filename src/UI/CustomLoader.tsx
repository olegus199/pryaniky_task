import { FC } from "react";
import { Box, CircularProgress } from "@mui/material";
import { colorTheme } from "../common/colorTheme.ts";

const CustomLoader: FC = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress sx={{ color: colorTheme.primary.main }} />
    </Box>
  );
};

export default CustomLoader;