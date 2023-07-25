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
  Alert: {
    variants: {
      "1btc-orange": {
        container: {
          background: "#0B0C14",
          border: "1px solid",
          borderColor: "orange.500",
        },
        title: {
          color: "white",
        },
        icon: {
          color: "orange.500",
        },
      },
    },
  },
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
      "1btc-orange-outline": {
        bg: "transparent",
        color: "white",
        border: "1px solid",
        borderColor: "orange.500",
        _hover: {
          color: "orange.500",
        },
        _active: {
          bg: "orange.600",
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
  Popover: {
    variants: {
      "1btc-orange": {
        header: {
          fontWeight: "bold",
          borderBottom: "none",
        },
        content: {
          background: "#0B0C14",
          width: "fit-content",
          maxWidth: ["80vw", null, "800px"],
          border: "1px solid",
          borderColor: "orange.500",
        },
      },
    },
  },
  Stepper: {
    variants: {
      "1btc-orange": {
        stepper: {
          bg: "transparent",
        },
        indicator: {
          border: "2px solid",
          borderColor: "gray.700",
          "&[data-status='active']": {
            bg: "transparent",
            border: "2px solid",
            borderColor: "orange.500",
          },
        },
        icon: {
          color: "white",
        },
        number: {
          color: "white",
        },
        separator: {
          bg: "gray.700",
          "&[data-status='complete']": {
            bg: "gray.900",
          },
        },
      },
    },
  },
};

// Chakra font overrides
const fonts = {
  heading: "Really Sans Large, Open Sans, sans-serif",
  body: "Really Sans Small, Open Sans, sans-serif",
};

const styles = {
  global: {
    "html, body": {
      fontSize: "lg",
      backgroundColor: "#0B0C14",
    },
  },
};

const theme = extendTheme({ config, colors, components, fonts, styles });

export default theme;
