import i18n from "../i18n";

export function getErrorMessage(error, key) {
  if (error?.response?.status === 429) return i18n.t("common.err_trop_tentatives");
  const serverKey = error?.response?.data?.error;
  if (typeof serverKey === "string" && serverKey.length && i18n.exists(serverKey)) {
    return i18n.t(serverKey);
  }
  return i18n.t(key);
}
