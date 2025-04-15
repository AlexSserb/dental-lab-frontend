import { ReactNode } from "react";
import styles from "components/RoundedBoxContainer/styles/ContainerStyles.module.scss";
import classNames from "classnames";

type Props = {
    children?: ReactNode;
    grow?: boolean;
    width?: string;
    minWidth?: string;
    height?: string;
    minHeight?: string;
    zIndex?: number;
    padding?: number;
};

export function RoundedBoxContainer(props: Props) {
    const { children, grow, width, minWidth, height, minHeight, zIndex, padding } = props;

    const style = {
        width: width || "auto",
        minWidth: minWidth || "",
        height: height || "auto",
        minHeight: minHeight || "",
        zIndex: zIndex || 1,
        padding: padding || 20,
        justifyContent: "start",
    };

    return (
        <div className={styles.pageContainer}>
            <div
                className={classNames(
                    styles["pageContainer-content"],
                    grow && styles["pageContainer-grow"]
                )}
                style={style}>
                {children}
            </div>
        </div>
    );
}
