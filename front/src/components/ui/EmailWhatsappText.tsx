import { EmailIcon } from "./icons/EmailIcon";
import { WhatsappIcon } from "./icons/WhatsappIcon";

type EmailWhatsappTextProps = {
  value: string | number;
  type: "whatsapp" | "email";
}

export const EmailWhatsappText = ({ value, type }: EmailWhatsappTextProps) => {
  return type === "whatsapp" ? (
    <a
      href={`https://api.whatsapp.com/send/?phone=${value}`}
      target="_blank"
      className="flex min-w-[130px] items-center text-primary hover:opacity-90 gap-1"
    >
      <WhatsappIcon className="size-6" />
      {value}
    </a>
  ) : type === "email" ? (
    <a
      href={`mailto:${value}`}
      target="_blank"
      className="flex items-center gap-1 text-primary hover:opacity-90"
    >
      <EmailIcon className="size-6" />
      {value}
    </a>
  ) : (
    ""
  );
};
