import styles from "./AddEditDocForm.module.scss";
import { FC, useActionState, useState } from "react";
import MainSection from "./MainSection.tsx";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IDocument } from "../../common/types.ts";
import { CustomTextButton } from "../../UI/CustomButton.tsx";
import { Stack, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { formatISO, parseISO } from "date-fns";
import { useAddNewDocMutation, useEditDocMutation, useGetDocksQuery } from "../../api/apiSlice.ts";

export type NewDoc = Omit<IDocument, "id">;

type Labels = Record<keyof NewDoc, string>;

type DateInputNames = keyof Pick<NewDoc, "employeeSigDate" | "companySigDate">

const labels: Labels = {
  documentType: "Тип документа",
  documentStatus: "Статус",
  employeeNumber: "Номер сотрудника",
  documentName: "Название документа",
  companySignatureName: "Подпись компании",
  employeeSignatureName: "Подпись сотрудника",
  companySigDate: "Дата подписи компании",
  employeeSigDate: "Дата подписи сотрудника",
};

const emptyFormData: NewDoc = {
  documentType: "",
  documentStatus: "",
  employeeNumber: "",
  documentName: "",
  companySignatureName: "",
  employeeSignatureName: "",
  companySigDate: formatISO(new Date()),
  employeeSigDate: formatISO(new Date()),
};

function defineInitState(doc?: IDocument): NewDoc {
  if (doc) {
    const {
      documentType,
      documentStatus,
      employeeNumber,
      documentName,
      companySignatureName,
      employeeSignatureName,
      companySigDate,
      employeeSigDate,
    } = doc;
    return {
      documentType,
      documentStatus,
      employeeNumber,
      documentName,
      companySignatureName,
      employeeSignatureName,
      companySigDate,
      employeeSigDate,
    };
  }

  return emptyFormData;
}

const AddEditDocForm: FC = () => {
  const { id } = useParams();
  const { data: docs = [] } = useGetDocksQuery();
  const doc = docs.find((d) => d.id === id);

  const [formData, setFormData] = useState<NewDoc>(defineInitState(doc));
  const [addDocState, formAction, pending] = useActionState<undefined>(addEditDocAction, undefined);

  const [addDoc] = useAddNewDocMutation();
  const [editDoc] = useEditDocMutation();
  const navigate = useNavigate();

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = e.target;

    setFormData((prev) => (
      {
        ...prev,
        [name]: value,
      }));
  }

  function handleDateChange(date: Date | null, key: DateInputNames) {
    try {
      if (date) {
        const formatted = formatISO(date);
        setFormData((prev) => ({
          ...prev,
          [key]: formatted,
        }));
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function addEditDocAction(): Promise<undefined> {
    try {
      if (doc) {
        await editDoc({ doc: formData, id: doc.id }).unwrap();
      } else {
        await addDoc(formData).unwrap();
      }
      navigate("/");
    } catch (e) {
      console.error("Failed to add doc", e);
    }
  }

  return (
    <MainSection>
      <div className={styles.header}>
        <h1 className={styles.h1}>{doc ? "Редактирование документа" : "Новый документ"}</h1>
        <Link
          to="/"
          className={styles.return_link}
        >
          К документам
        </Link>
      </div>


      <form className={styles.form}>
        <Stack spacing={3}>
          {Object.entries(formData).map(([k, val], idx) => {
            const key = k as keyof NewDoc;

            if (key === "employeeSigDate" || key === "companySigDate") {
              return (
                <LocalizationProvider
                  key={key}
                  dateAdapter={AdapterDateFns}
                >
                  <DatePicker
                    label={labels[key]}
                    value={val ? parseISO(val) : null}
                    format="dd/MM/yyyy"
                    disableFuture
                    onChange={(date) => handleDateChange(date, key)}
                  />
                </LocalizationProvider>
              );
            }

            return (
              <TextField
                key={key}
                id={key}
                name={key}
                required
                autoFocus={idx === 0}
                value={val}
                label={labels[key]}
                onChange={handleInputChange}
              />
            );
          })}

          <CustomTextButton
            text={doc ? "Сохранить" : "Добавить"}
            variant="contained"
            color="primary"
            type="submit"
            size="large"
            fontSize={18}
            loading={pending}
            disabled={Object.values(formData).some((v) => !v)}
            formAction={formAction}
          />
        </Stack>
      </form>
    </MainSection>
  );
};

export default AddEditDocForm;