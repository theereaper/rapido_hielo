import { VERSIONNUMBER } from "../../../constants/VersionNumber";

export const VersionNumber = () => {
  return (
    <>
      <div className="version-number-container bg-gray-100 rounded-xl px-2 py-1">
        <span className="flex gap-1 text-xs text-text-primary">{VERSIONNUMBER}</span>
      </div>
    </>
  );
};
