import DocsList from "../features/docs/DocsList.tsx";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    async function testApi() {
      const result = await fetch(`https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs/login`, {
        method: "POST",
        body: JSON.stringify({ username: "user1", password: "password" }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await result.json();
      console.log(data);
    }

    // testApi();
  }, []);
  return (
    <>
      <DocsList />
    </>
  );
}

export default App;