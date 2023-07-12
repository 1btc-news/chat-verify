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
    sizes: {
      xl: {
        fontSize: "xl",
        px: 8,
        py: 4,
      },
      "2xl": {
        fontSize: "2xl",
        px: 10,
        py: 5,
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
    "html, body": {
      fontSize: "2xl",
    },
  },
};

const theme = extendTheme({ config, colors, components, fonts, styles });

export default theme;
