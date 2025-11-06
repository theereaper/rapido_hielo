import { Helmet } from "react-helmet";
import { SITE_NAME } from "../../constants/siteName";

interface MetaProps {
  title?: string;
  description?: string;
}

export default function Meta({ title, description }: MetaProps) {
  const fullTitle = title ? `${title} - ${SITE_NAME}` : SITE_NAME;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
    </Helmet>
  );
}
