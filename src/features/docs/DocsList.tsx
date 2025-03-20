import styles from "./DocsList.module.scss";
import { FC } from "react";
import { CustomTextButton } from "../../UI/CustomButton.tsx";
import { useGetDocksQuery } from "../../api/apiSlice.ts";
import Document from "./Document.tsx";

const DocsList: FC = () => {
  const { data: docs = [], isFetching, isError, error } = useGetDocksQuery();

  return (
    <main className={styles.main_section}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.h1}>Документы</h1>
          <CustomTextButton
            text="Добавить документ"
            variant="contained"
            color="primary"
          />
        </div>
        <ul className={styles.docs_list}>
          {docs.map((document) => (
            <Document
              key={document.id}
              document={document}
            />
          ))}
        </ul>
      </div>
    </main>
  );
};

export default DocsList;