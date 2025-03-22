import styles from "./MainSection.module.scss";
import { FC, ReactNode } from "react";

interface MainSectionProps {
  children: ReactNode;
}

const MainSection: FC<MainSectionProps> = ({ children }) => {
  return (
    <main className={styles.main_section}>
      <div className={styles.content}>
        {children}
      </div>
    </main>
  );
};

export default MainSection;