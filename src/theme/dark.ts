import { DefaultTheme } from "styled-components";
import { dark as darkAlert } from "components/Alert/theme";
import { dark as darkCard } from "components/Card/theme";
import { dark as darkModal } from "components/Modal/theme";
import base from "./base";
import { darkColors } from "./colors";

const darkTheme: DefaultTheme = {
  ...base,
  isDark: true,
  alert: darkAlert,
  colors: darkColors ,
  card: darkCard,
  modal: darkModal,
};

export default darkTheme;
