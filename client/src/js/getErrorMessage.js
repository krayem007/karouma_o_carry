import i18n from "../i18n";

export function getErrorMessage(error, key) {
  if (error?.response?.status === 429) return i18n.t("common.err_trop_tentatives");
  return i18n.t(key);
}
