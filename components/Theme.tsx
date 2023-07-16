import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";

const Theme = ({ children }: {children: React.ReactNode}) => (
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme