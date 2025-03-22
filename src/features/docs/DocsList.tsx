import styles from "./DocsList.module.scss";
import { FC } from "react";
import { CustomTextButton } from "../../UI/CustomButton.tsx";
import { useGetDocksQuery } from "../../api/apiSlice.ts";
import Document from "./Document.tsx";
import { useNavigate } from "react-router-dom";
import MainSection from "./MainSection.tsx";
import CustomLoader from "../../UI/CustomLoader.tsx";

const DocsList: FC = () => {
  const { data: docs = [], isFetching, isError, error } = useGetDocksQuery();
  const navigate = useNavigate();

  function handleAddDocClick(): void {
    navigate("/add-edit-doc");
  }

  return (
    <MainSection>
      <div className={styles.header}>
        <h1 className={styles.h1}>Документы</h1>
        <CustomTextButton
          text="Добавить документ"
          variant="contained"
          color="primary"
          onClick={handleAddDocClick}
        />
      </div>
      <div className={styles.body}>

        {isFetching ? <CustomLoader /> : (
          <ul className={styles.docs_list}>
            {docs.map((document) => (
              <Document
                key={document.id}
                document={document}
              />
            ))}
          </ul>
        )}
      </div>
    </MainSection>
  );
};

export default DocsList;