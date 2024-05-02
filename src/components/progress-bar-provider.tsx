"use client";

import { AppProgressBar as NProgressBar } from "next-nprogress-bar";

export function ProgressBar() {
  return <NProgressBar options={{ showSpinner: false }} shallowRouting />;
}
