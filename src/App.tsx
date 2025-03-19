import { useEffect, useState } from "react";

const API_URL = "https://test.v5.pryaniky.com";
const token = "supersecrettoken_for_user1";

interface ITableData {
  companySigDate: string;
  companySignatureName: string;
  documentName: string;
  documentStatus: string;
  documentType: string;
  employeeNumber: string;
  employeeSigDate: string;
  employeeSignatureName: string;
  id: string;
}

function App() {
  const [tableData, setTableData] = useState<ITableData[]>([]);

  useEffect(() => {
    async function testApi() {
      const result = await fetch(`${API_URL}/ru/data/v3/testmethods/docs/login`, {
        method: "POST",
        body: JSON.stringify({ username: "user1", password: "password" }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await result.json();
      console.log(data);
    }

    async function getData() {
      const result = await fetch(`${API_URL}/ru/data/v3/testmethods/docs/userdocs/get`, {
        headers: {
          "x-auth": token,
        },
      });
      const data = await result.json();
      setTableData(data.data);
    }

    getData();

    // testApi();
  }, []);
  return (
    <>
      {tableData.map((data) => (
        <div key={data.id}>
          <p>{data.companySigDate}</p>
          <p>{data.companySignatureName}</p>
          <p>{data.documentName}</p>
          <p>{data.documentStatus}</p>
          <p>{data.documentType}</p>
          <p>{data.employeeNumber}</p>
          <p>{data.employeeSigDate}</p>
          <p>{data.employeeSignatureName}</p>
        </div>
      ))}
    </>
  );
}

export default App;