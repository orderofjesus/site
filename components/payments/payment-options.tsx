"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CreditCard, Smartphone, Building2, Copy } from "lucide-react";

export type PaymentOptionsProps = {
  event: any;
  registrationId?: string;
  selectedTicketType?: string | null;
  numberOfPeople?: number;
  phoneCopyTargets?: { mtn?: string; airtel?: string };
  defaultExpanded?: "card" | "mobile" | "bank" | null;
  sectionId?: string;
};

export function PaymentOptions({
  event,
  registrationId,
  selectedTicketType,
  numberOfPeople = 1,
  phoneCopyTargets = { mtn: "0772123456", airtel: "0752123456" },
  defaultExpanded = null,
  sectionId,
}: PaymentOptionsProps) {
  const [expanded, setExpanded] = React.useState<
    "card" | "mobile" | "bank" | null
  >(defaultExpanded);

  const computeAmount = () => {
    try {
      const pricing = event?.pricing;
      if (!pricing) return undefined;
      const priceString =
        selectedTicketType === "couple"
          ? pricing.discounted || pricing.regular
          : pricing.regular;
      if (!priceString) return undefined;
      const match = String(priceString).match(/[\d,]+/);
      if (!match) return priceString;
      const base = parseFloat(match[0].replace(/,/g, ""));
      const total = base * (numberOfPeople || 1);
      return `$ ${total.toLocaleString()}`;
    } catch {
      return undefined;
    }
  };

  const amount = computeAmount();

  return (
    <div id={sectionId} className="space-y-3">
      <h4 className="text-sm font-semibold text-black/70 dark:text-white/70">
        Choose Payment Method
      </h4>

      {/* Credit Card */}
      <Button
        variant="outline"
        size="lg"
        className="w-full cursor-pointer justify-start gap-3 rounded-none border-2 border-black/10 py-6 text-left hover:border-black hover:bg-black hover:text-white dark:border-white/10 dark:hover:border-white dark:hover:bg-white dark:hover:text-black"
        onClick={() => {
          toast.info("Credit Card Payment", {
            description:
              "Credit card payment integration will be available here.",
          });
        }}
      >
        <CreditCard className="h-5 w-5 shrink-0" />
        <div className="group flex-1">
          <div className="font-semibold">Credit Card</div>
          <div className="text-xs opacity-70">
            Pay securely with Visa, Mastercard, or Amex
          </div>
        </div>
        {amount && (
          <div className="text-xs font-semibold opacity-70">{amount}</div>
        )}
      </Button>

      {/* Mobile Money */}
      <div className="overflow-hidden rounded-none border-2 border-black/10 dark:border-white/10">
        <Button
          variant="outline"
          size="lg"
          className={`w-full cursor-pointer justify-start gap-3 rounded-none border-0 py-6 text-left transition-colors ${
            expanded === "mobile"
              ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
              : "hover:border-black hover:bg-black hover:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-black"
          }`}
          onClick={() => setExpanded(expanded === "mobile" ? null : "mobile")}
        >
          <Smartphone className="h-5 w-5 shrink-0" />
          <div className="group flex-1">
            <div className="font-semibold">Mobile Money</div>
            <div className="text-xs opacity-70">
              Pay with MTN, Airtel, or other mobile wallets
            </div>
          </div>
          {amount && (
            <div className="text-xs font-semibold opacity-70">{amount}</div>
          )}
        </Button>
        {expanded === "mobile" && (
          <div className="border-t-2 border-black/10 bg-neutral-50 p-6 dark:border-white/10 dark:bg-neutral-800">
            <h5 className="mb-4 font-semibold">
              Mobile Money Payment Instructions
            </h5>
            <div className="mb-4 space-y-3 text-sm">
              <div>
                <p className="mb-1 font-medium">MTN Mobile Money:</p>
                <ul className="ml-4 list-disc space-y-1 text-black/70 dark:text-white/70">
                  <li>Dial *165#</li>
                  <li>Select option 4 (Send Money)</li>
                  <li className="flex items-center gap-2">
                    <span>
                      Enter:{" "}
                      <strong className="font-mono text-xs">
                        {phoneCopyTargets.mtn?.replace(/(\d{3})(?=\d)/g, "$1 ")}
                      </strong>
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-5 w-5 p-0 hover:bg-black/10 dark:hover:bg-white/10"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          phoneCopyTargets.mtn || "",
                        );
                        toast.success("Copied to clipboard", {
                          description: "MTN number copied successfully",
                        });
                      }}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </li>
                  <li>
                    Enter amount:{" "}
                    <strong>{amount || "See event pricing"}</strong>
                  </li>
                  <li>
                    Reference:{" "}
                    <strong>
                      {registrationId
                        ? `Reg ${registrationId}`
                        : "Event Registration"}
                    </strong>
                  </li>
                </ul>
              </div>
              <div>
                <p className="mb-1 font-medium">Airtel Money:</p>
                <ul className="ml-4 list-disc space-y-1 text-black/70 dark:text-white/70">
                  <li>Dial *185#</li>
                  <li>Select option 1 (Send Money)</li>
                  <li className="flex items-center gap-2">
                    <span>
                      Enter:{" "}
                      <strong className="font-mono text-xs">
                        {phoneCopyTargets.airtel?.replace(
                          /(\d{3})(?=\d)/g,
                          "$1 ",
                        )}
                      </strong>
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-5 w-5 p-0 hover:bg-black/10 dark:hover:bg-white/10"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          phoneCopyTargets.airtel || "",
                        );
                        toast.success("Copied to clipboard", {
                          description: "Airtel number copied successfully",
                        });
                      }}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </li>
                  <li>Enter amount and confirm</li>
                </ul>
              </div>
            </div>
            <div className="rounded-md bg-yellow-50 p-3 dark:bg-yellow-900/20">
              <p className="text-xs text-yellow-800 dark:text-yellow-300">
                <strong>Important:</strong> After payment, please send a
                screenshot of the transaction to our WhatsApp:{" "}
                <strong>+256 772 123 456</strong>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bank Transfer */}
      <div className="overflow-hidden rounded-none border-2 border-black/10 dark:border-white/10">
        <Button
          variant="outline"
          size="lg"
          className={`w-full cursor-pointer justify-start gap-3 rounded-none border-0 py-6 text-left transition-colors ${
            expanded === "bank"
              ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
              : "hover:border-black hover:bg-black hover:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-black"
          }`}
          onClick={() => setExpanded(expanded === "bank" ? null : "bank")}
        >
          <Building2 className="h-5 w-5 shrink-0" />
          <div className="group flex-1">
            <div className="font-semibold">Bank Transfer</div>
            <div className="text-xs opacity-70">
              Transfer to our bank account (details provided)
            </div>
          </div>
          {amount && (
            <div className="text-xs font-semibold opacity-70">{amount}</div>
          )}
        </Button>
        {expanded === "bank" && (
          <div className="border-t-2 border-black/10 bg-neutral-50 p-6 dark:border-white/10 dark:bg-neutral-800">
            <h5 className="mb-4 font-semibold">Bank Transfer Details</h5>
            <div className="mb-4 space-y-2 text-sm">
              <div className="flex justify-between border-b border-black/10 pb-2 dark:border-white/10">
                <span className="text-black/70 dark:text-white/70">
                  Bank Name:
                </span>
                <span className="font-medium">Stanbic Bank Uganda</span>
              </div>
              <div className="flex justify-between border-b border-black/10 pb-2 dark:border-white/10">
                <span className="text-black/70 dark:text-white/70">
                  Account Name:
                </span>
                <span className="font-medium">Ministry Events</span>
              </div>
              <div className="flex justify-between border-b border-black/10 pb-2 dark:border-white/10">
                <span className="text-black/70 dark:text-white/70">
                  Account Number:
                </span>
                <span className="font-medium">0123456789</span>
              </div>
              <div className="flex justify-between border-b border-black/10 pb-2 dark:border-white/10">
                <span className="text-black/70 dark:text-white/70">
                  Branch:
                </span>
                <span className="font-medium">Kampala Road</span>
              </div>
              <p className="text-xs opacity-70">
                Use your{" "}
                {registrationId
                  ? `registration ID ${registrationId}`
                  : "registration ID"}{" "}
                as the payment reference. Send proof of payment to the specified
                contact for faster confirmation.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
