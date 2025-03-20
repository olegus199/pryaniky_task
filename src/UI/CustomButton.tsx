import "./CustomButton.scss";
import { FC } from "react";
import { Button, createTheme, IconButton, styled, ThemeProvider } from "@mui/material";
import { FiEdit } from "react-icons/fi";

interface CustomTextButtonProps {
  text: string;
  variant: "text" | "outlined" | "contained";
  color: "primary" | "secondary" | "info";
}

type CustomIconButtonProps = Pick<CustomTextButtonProps, "color">

const theme = createTheme({
  palette: {
    primary: {
      main: "#3877ee",
      dark: "#1e66eb",
      contrastText: "#fff",
    },
    secondary: {
      main: "#ac3931",
      contrastText: "#ac3931",
    },
    info: {
      main: "#ccc",
    },
  },
  typography: {
    button: {
      fontSize: 14,
      textTransform: "none",
      fontFamily: "'Onset', sans-serif",
    },
  },
});

const CustomTextButton: FC<CustomTextButtonProps> = ({ text, variant, color }) => {
  const StyledTextButton = styled(Button)(() => ({
    ...(variant === "text" && {
      display: "block",
      margin: "1.25rem 0 0 auto",
    }),
  }));

  return (
    <ThemeProvider theme={theme}>
      <StyledTextButton
        variant={variant}
        disableElevation
        size="medium"
        color={color}
      >
        {text}
      </StyledTextButton>
    </ThemeProvider>
  );
};

const CustomIconButton: FC<CustomIconButtonProps> = ({ color }) => {
  return (
    <ThemeProvider theme={theme}>
      <IconButton
        aria-label="edit"
        size="small"
        color={color}
      >
        <FiEdit />
      </IconButton>
    </ThemeProvider>
  );
};

export { CustomTextButton, CustomIconButton };