"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

type Props = {
  name?: string;
  email?: string;
  notes?: string;
};

/**
 * Cal.com inline booking embed for the "tryratio/30min" event. Rendered
 * inside the demo form card once the form is submitted, so the visitor can
 * pick a slot. Name / email / message are prefilled into the booking.
 */
export function CalEmbed({ name, email, notes }: Props) {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", {
        theme: "dark",
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <Cal
      namespace="30min"
      calLink="tryratio/30min"
      style={{
        width: "100%",
        height: "100%",
        minHeight: 560,
        overflow: "visible",
      }}
      config={{
        layout: "month_view",
        ...(name ? { name } : {}),
        ...(email ? { email } : {}),
        ...(notes ? { notes } : {}),
      }}
    />
  );
}
