import { Descriptions, Tooltip } from "antd";
import { useRef } from "react";
import { EmailWhatsappText } from "../../../components/ui/EmailWhatsappText";
import { EditIcon } from "../../../components/ui/icons/EditIcon";
import {
  ModalChangePassword,
  ModalChangePasswordRef,
} from "../../../components/ui/modals/account/ModalChangePassword";
import {
  ModalUAccount,
  ModalUAccountRef,
} from "../../../components/ui/modals/account/ModalUAccount";
import { NoInfoBadget } from "../../../components/ui/NoInfoBadget";
import { SectionPrivateHeader } from "../../../components/ui/SectionPrivateHeader";
import { useAuthUser } from "../../../store/useAuthUser";
import { LockIcon } from "./../../../components/ui/icons/LockIcon";

export default function MyAccountPrivate() {
  const { userLogged, getMe } = useAuthUser();

  const modalCURef = useRef<ModalUAccountRef>(null);
  const modalChangePassRef = useRef<ModalChangePasswordRef>(null);

  if (!userLogged)
    return (
      <div>
        <SectionPrivateHeader title="Mi cuenta" existsButton={false} />
        <p>Información no disponible</p>
      </div>
    );

  return (
    <>
      <SectionPrivateHeader title="Mi cuenta" existsButton={false} />

      <div className="border p-4 py-10 rounded-xl max-w-[800px] mx-auto">
        {/* actions */}
        <div className="flex justify-end gap-4 mb-2">
          {/* Cambiar contraseña */}
          <Tooltip
            placement="top"
            className="cursor-pointer"
            title="Cambiar contraseña"
          >
            <button onClick={() => modalChangePassRef.current?.childFunction()}>
              <LockIcon className="size-6" />
            </button>
          </Tooltip>

          {/* Editar */}
          <Tooltip placement="top" className="cursor-pointer" title="Editar">
            <button
              onClick={() => modalCURef.current?.childFunction(userLogged)}
            >
              <EditIcon className="text-yellow-500 size-6" />
            </button>
          </Tooltip>
        </div>

        {/* data user */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex items-center justify-center">
            <div className="bg-primary-soft size-[160px] flex justify-center items-center rounded-full">
              <p className="text-primary text-7xl">{userLogged?.name[0]}</p>
            </div>
          </div>

          <Descriptions
            title="Perfil de usuario"
            layout="vertical"
            column={1}
            size="middle"
          >
            <Descriptions.Item label="Nombre">
              {userLogged?.name}
            </Descriptions.Item>
            <Descriptions.Item label="Apellido">
              {userLogged?.lastname}
            </Descriptions.Item>
            <Descriptions.Item label="Correo electrónico">
              {userLogged?.email ? (
                <EmailWhatsappText value={userLogged?.email} type="email" />
              ) : (
                <NoInfoBadget text="correo electrónico" />
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Rol">
              {userLogged?.role}
            </Descriptions.Item>
          </Descriptions>
        </div>
      </div>

      <ModalUAccount ref={modalCURef} reloadTable={getMe} />

      <ModalChangePassword ref={modalChangePassRef} />
    </>
  );
}
