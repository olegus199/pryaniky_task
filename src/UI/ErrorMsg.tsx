import styles from "./ErrorMsg.module.scss";
import { FC } from "react";

interface ErrorMsgProps {
  msg: string;
}

const ErrorMsg: FC<ErrorMsgProps> = ({ msg }) => {
  return (
    <div className={styles.error_msg}>An error occurred: {msg}</div>
  );
};

export default ErrorMsg;