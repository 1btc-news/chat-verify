import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

interface VariantColorProps {
  colorScheme?: string;
}

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
  stepper: {
    200: "#F27400", // 1btc-orange
  },
};

/*
import { alertAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(alertAnatomy.keys);

const leftAccentVariant = definePartsStyle({
  container: (props) => ({
    borderLeft: '4px solid',
    borderColor: props.colorScheme === 'warning' ? 'orange.500' : undefined,
    background: props.colorScheme === 'warning' ? 'orange.50' : undefined,
    color: props.colorScheme === 'warning' ? 'white' : undefined,
  }),
});

export const alertTheme = defineMultiStyleConfig({
  variants: { 'left-accent': leftAccentVariant },
});
*/

// Chakra component style overrides
const components = {
  Alert: {
    //parts: ["container"],
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
