import { createStyles } from "antd-style";

export const useStyles = createStyles(({token, css}) => ({
    body: {
        backgroundColor: token.colorBgLayout
    }
}));