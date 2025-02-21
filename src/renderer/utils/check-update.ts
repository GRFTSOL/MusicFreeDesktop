import { compare } from "compare-versions";
import { showModal } from "../components/Modal";
import { getUserPreference } from "./user-perference";
import {appUtil} from "@shared/utils/renderer";

export default async function checkUpdate(forceCheck?: boolean) {
  /** checkupdate */
  const updateInfo = await appUtil.checkUpdate();
  if (updateInfo.update) {
    const skipVersion = getUserPreference("skipVersion");
    if (
      !forceCheck &&
      skipVersion &&
      compare(updateInfo.version, skipVersion, "<=")
    ) {
      return false;
    }
    showModal("Update", {
      currentVersion: updateInfo.version,
      update: updateInfo.update,
    });
    return true;
  }
  return false;
}
