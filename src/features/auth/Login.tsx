import styles from "./Login.module.scss";
import { FC, useActionState, useState } from "react";
import MainSection from "../docs/MainSection.tsx";
import { Stack, TextField } from "@mui/material";
import * as React from "react";
import { CustomTextButton } from "../../UI/CustomButton.tsx";
import { useLoginMutation } from "../../api/apiSlice.ts";
import { useAppDispatch } from "../../app/hooks-redux.ts";
import { useNavigate } from "react-router-dom";
import { tokenChanged } from "./authTokenSlice.ts";
import ErrorMsg from "../../UI/ErrorMsg.tsx";

export interface ILoginData {
  username: string;
  password: string;
}

type Labels = Record<keyof ILoginData, string>;

const placeholders: Labels = {
  username: "user1",
  password: "мой-пароль",
};

const labels: Labels = {
  username: "username",
  password: "пароль",
};

const Login: FC = () => {
  const [formData, setFormData] = useState<ILoginData>({
    username: "",
    password: "",
  });
  const [loginState, formAction, isPending] = useActionState<undefined>(loginAction, undefined);
  const [login] = useLoginMutation();

  const [error, setError] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setError("");

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function loginAction(): Promise<undefined> {
    try {
      const result = await login(formData).unwrap();
      const token = result.data?.token;

      if (token) {
        dispatch(tokenChanged(token));
        localStorage.setItem("authToken", token);
        navigate("/docs");
      } else {
        if (result.error_text) {
          setError(result.error_text);
        }
      }
    } catch (e) {
      console.error("Failed to login", e);
    }
  }

  return (
    <MainSection>
      <h1 className={styles.h1}>Авторизуйтесь, чтобы продолжить</h1>
      <form className={styles.form}>
        <Stack spacing={3}>
          {Object.entries(formData).map(([k, val], idx) => {
            const key = k as keyof ILoginData;

            return (
              <TextField
                key={key}
                id={key}
                name={key}
                required
                autoFocus={idx === 0}
                value={val}
                type={key === "username" ? "text" : "password"}
                placeholder={placeholders[key]}
                label={labels[key]}
                onChange={handleInputChange}
              />);
          })}

          <CustomTextButton
            text="Войти"
            variant="contained"
            color="primary"
            type="submit"
            size="large"
            fontSize={18}
            loading={isPending}
            disabled={Object.values(formData).some((v) => !v)}
            formAction={formAction}
          />
        </Stack>
      </form>

      {error && <ErrorMsg msg={error} />}
    </MainSection>
  );
};

export default Login;