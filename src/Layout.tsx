import React from "react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

interface LayoutProps {
  children: ReactJSXElement;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="flex flex-col justify-between min-h-screen !font-sans">
        <div className="main-wrapper flex-grow flex flex-col p-4 w-1/2 ml-auto mr-auto max-sm:p-0 max-sm:w-full">
          {children}
        </div>
        <div className="flex justify-center p-4">
          <a
            href="https://github.com/jaypyles/very-simple-notes"
            className="ml-auto mr-auto mb-2 no-underline !text-gray-500 !visited:text-gray-500"
          >
            Very Simple Notes
          </a>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
