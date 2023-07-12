import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

// Chakra theme configuration
const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
  cssVarPrefix: "1btc",
};

// Chakra color overrides
const colors = {
  orange: {
    100: "#FFDAB9",
    200: "#FFC08B",
    300: "#FFAA5C",
    400: "#FF941E",
    500: "#F27400", // 1btc-orange
    600: "#C35A00",
    700: "#924100",
    800: "#612B00",
    900: "#301500",
  },
};

// Chakra component style overrides
const components = {
  Button: {
    variants: {
      "1btc-orange": {
        bg: "orange.500",
        color: "white",
        _hover: {
          bg: "orange.600",
        },
        _active: {
          bg: "orange.700",
        },
      },
    },
  },
};

// Chakra font overrides
const fonts = {
  heading: "Open Sans, sans-serif",
  body: "Open Sans, sans-serif",
};

const styles = {
  global: {
    body: {
      fontSize: "24px",
    },
  },
};

const theme = extendTheme({ config, colors, components, fonts, styles });

export default theme;
