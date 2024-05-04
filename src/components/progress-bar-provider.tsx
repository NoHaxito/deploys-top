"use client";

import { AppProgressBar as NProgressBar } from "next-nprogress-bar";

export function ProgressBar() {
	return (
		<NProgressBar
			color="#006BCE"
			options={{ showSpinner: false }}
			shallowRouting
		/>
	);
}
