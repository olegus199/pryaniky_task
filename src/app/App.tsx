import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DocsList from "../features/docs/DocsList.tsx";
import { FC, ReactNode } from "react";
import AddEditDocForm from "../features/docs/AddEditDocForm.tsx";
import { useAppDispatch } from "./hooks-redux.ts";
import { tokenChanged } from "../features/auth/authTokenSlice.ts";
import Login from "../features/auth/Login.tsx";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem("authToken");
  const dispatch = useAppDispatch();

  if (!token) {
    return <Navigate
      to="/"
      replace
    />;
  } else {
    dispatch(tokenChanged(token));
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Routes>
                <Route
                  path={"/docs"}
                  element={<DocsList />}
                />
                <Route
                  path="/add-edit-doc"
                  element={<AddEditDocForm />}
                />
                <Route
                  path="/add-edit-doc/:id"
                  element={<AddEditDocForm />}
                />
              </Routes>
            </ProtectedRoute>
          }
        >
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;