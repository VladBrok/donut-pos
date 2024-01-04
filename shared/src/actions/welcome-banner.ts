import { createAction } from "./index.js";

export const openWelcomeBannerAction = createAction("welcomeBanner/open");

export const closeWelcomeBannerAction = createAction("welcomeBanner/close");
