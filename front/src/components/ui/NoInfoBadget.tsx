type NoInfoBadgetProps = {
  text?: string;
};

export const NoInfoBadget = (props: NoInfoBadgetProps) => {
  const { text = "información" } = props;

  return (
    <div
      className="inline-flex items-center gap-x-1.5 py-1.5 px-3 
      rounded-full text-center text-xs font-medium bg-badge-gray"
    >
      Sin {text}
    </div>
  );
};
