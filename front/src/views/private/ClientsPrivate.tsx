import { SectionPrivateHeader } from "../../components/ui/SectionPrivateHeader";

export default function ClientsPrivate() {
  return (
    <>
      <SectionPrivateHeader
        title="Clientes"
        onButtonClick={() => console.log("hola")}
      />
    </>
  );
}
