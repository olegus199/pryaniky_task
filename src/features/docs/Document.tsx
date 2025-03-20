import styles from "./Document.module.scss";
import { FC } from "react";
import { IDocument } from "../../common/types.ts";
import { HiOutlineDocumentText } from "react-icons/hi";
import { formatDate } from "../../common/utlis.ts";
import { CustomIconButton, CustomTextButton } from "../../UI/CustomButton.tsx";

interface DocumentProps {
  document: IDocument;
}

interface LabelData {
  label: string;
  content: string | { contractName: string; party?: "сотрудник" | "компания" }[];
}

type DocumentData = LabelData[] | "divider";

const Document: FC<DocumentProps> = ({
  document: {
    id,
    documentName,
    documentStatus,
    documentType,
    companySignatureName,
    employeeSignatureName,
    employeeNumber,
    employeeSigDate,
    companySigDate,
  },
}) => {
  const data: DocumentData[] = [
    [
      {
        label: "статус",
        content: documentStatus,
      },
      {
        label: "номер сотрудника",
        content: employeeNumber,
      },
    ],
    "divider",
    [
      {
        label: "документы",
        content: [
          {
            contractName: documentName,
          },
          {
            contractName: companySignatureName,
            party: "компания",
          },
          {
            contractName: employeeSignatureName,
            party: "сотрудник",
          },
        ],
      },
    ],
    "divider",
    [
      {
        label: "подпись компании",
        content: formatDate(companySigDate),
      },
      {
        label: "подпись сотрудника",
        content: formatDate(employeeSigDate),
      },
    ],
  ];

  return (
    <li className={styles.document}>
      <div className={styles.header}>
        <p className={styles.document_type}>{documentType}</p>
        <CustomIconButton color="info" />
      </div>

      <div className={styles.document_data}>
        {data.map((v, idx) => {
          if (typeof v === "string") {
            return (
              <hr
                key={idx}
                className={styles.divider}
              />
            );
          } else {
            return v.map((val, i) => (
              <LabelData
                key={i}
                label={val.label}
                content={val.content}
              />
            ));
          }
        })}
      </div>

      <CustomTextButton
        text="Удалить"
        variant="text"
        color="secondary"
      />
    </li>
  );
};

const LabelData: FC<LabelData> = ({ label, content }) => {
  return (
    <div className={styles.label_data}>
      <p className={styles.label}>{label}</p>
      {Array.isArray(content) ? (
        <ul className={styles.files_list}>
          {content.map((v, idx) => (
            <li
              key={idx}
              className={styles.file}
            >
              <HiOutlineDocumentText className={styles.file_icon} />
              <p>{v.contractName}{v.party && <span> ({v.party})</span>}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.text_content}>{content}</p>
      )}
    </div>
  );
};

export default Document;