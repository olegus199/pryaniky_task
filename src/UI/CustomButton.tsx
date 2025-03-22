import "./CustomButton.scss";
import { FC } from "react";
import { Button, createTheme, IconButton, styled, ThemeProvider } from "@mui/material";
import { FiEdit } from "react-icons/fi";
import { colorTheme } from "../common/colorTheme.ts";

interface CustomTextButtonProps {
  text: string;
  variant: "text" | "outlined" | "contained";
  color: "primary" | "secondary" | "info";
  type?: "button" | "submit" | "reset";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  loading?: boolean;
  fontSize?: number;
  onClick?: () => void;
  formAction?: () => void;
}

type CustomIconButtonProps = Pick<CustomTextButtonProps, "color" | "onClick">

const CustomTextButton: FC<CustomTextButtonProps> = ({
  text,
  variant,
  color,
  type,
  size = "medium",
  fontSize = 14,
  disabled,
  loading,
  onClick,
  formAction,
}) => {
  const StyledTextButton = styled(Button)(() => ({
    ...(variant === "text" && {
      display: "block",
      margin: "1.25rem 0 0 auto",
    }),
  }));

  const theme = createTheme({
    palette: {
      primary: {
        main: colorTheme.primary.main,
        dark: colorTheme.primary.dark,
        contrastText: "#fff",
      },
      secondary: {
        main: colorTheme.secondary.main,
        contrastText: colorTheme.secondary.contrastText,
      },
      info: {
        main: colorTheme.info.main,
      },
    },
    typography: {
      button: {
        textTransform: "none",
        fontFamily: "'Onset', sans-serif",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <StyledTextButton
        variant={variant}
        disableElevation
        color={color}
        onClick={onClick}
        loading={loading}
        style={{
          fontSize,
        }}
        size={size}
        formAction={formAction}
        disabled={disabled}
        type={type}
      >
        {text}
      </StyledTextButton>
    </ThemeProvider>
  );
};

const CustomIconButton: FC<CustomIconButtonProps> = ({ color, onClick }) => {
  const StyledIconButton = styled(IconButton)(() => ({
    transition: "color .15s ease-out",
    "&:hover": {
      color: colorTheme.primary.main,
    },
  }));

  const theme = createTheme({
    palette: {
      info: {
        main: colorTheme.info.main,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <StyledIconButton
        aria-label="edit"
        size="small"
        color={color}
        onClick={onClick}
      >
        <FiEdit />
      </StyledIconButton>
    </ThemeProvider>
  );
};

export { CustomTextButton, CustomIconButton };