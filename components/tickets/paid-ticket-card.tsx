/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import dynamic from "next/dynamic";

// Lazy-load QRCodeSVG to avoid SSR issues
const QRCodeSVG = dynamic(
  async () => {
    try {
      const mod = await import("qrcode.react");
      return mod.QRCodeSVG as any;
    } catch (e) {
      // Fallback dummy component if dependency isn't installed
      return ({ value }: any) => (
        <svg width="120" height="120" viewBox="0 0 120 120">
          <rect width="120" height="120" fill="#fff" />
          <rect
            x="4"
            y="4"
            width="112"
            height="112"
            stroke="#000"
            strokeWidth="2"
            fill="none"
          />
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="10"
          >
            QR
          </text>
        </svg>
      );
    }
  },
  { ssr: false },
);

export function PaidTicketCard({ registration, event, titleClassName }: any) {
  const code = `${registration?._id || "TICKET"}`;
  return (
    <div className="border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-neutral-900">
      <h4 className={`${titleClassName || "text-xl"} mb-3 font-bold`}>
        Your Ticket
      </h4>
      <div className="flex flex-wrap items-center gap-6">
        <div className="rounded-md border bg-white p-3">
          <QRCodeSVG />
        </div>
        <div>
          <p className="text-muted-foreground text-sm">
            Paid registration confirmed
          </p>
          <p className="text-sm">
            Event: <span className="font-semibold">{event?.title}</span>
          </p>
          <p className="text-sm">
            Name:{" "}
            <span className="font-semibold">
              {registration?.userName || registration?.userEmail}
            </span>
          </p>
          <p className="text-sm">
            Admit:{" "}
            <span className="font-semibold">
              {registration?.numberOfPeople || 1}
            </span>
          </p>
          <p className="text-muted-foreground text-xs">
            Ticket ID: {registration?._id}
          </p>
        </div>
      </div>
    </div>
  );
}
