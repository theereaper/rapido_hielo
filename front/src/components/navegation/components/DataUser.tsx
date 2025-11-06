import { Avatar, Dropdown, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import { MYACCOUNTPRIVATE } from "../../../routes/Paths";
import { useAuthUser } from "../../../store/useAuthUser";
import { ConfigIcon } from "../../ui/icons/ConfigIcon";
import { UserIcon } from "../../ui/icons/UserIcon";

type DataUserProps = {
  closeDrawer?: () => void;
};

export const DataUser = (props: DataUserProps) => {
  const { userLogged } = useAuthUser();

  const navigate = useNavigate();

  const truncate = (str?: string, maxLength = 8) => {
    if (!str) return "";
    return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
  };

  const items = [
    {
      label: (
        <button
          className="flex gap-2 text-sm min-w-[150px]"
          onClick={() => {
            navigate(MYACCOUNTPRIVATE);
            if (props?.closeDrawer) props?.closeDrawer();
          }}
        >
          <UserIcon styles="size-5" />
          Mi cuenta
        </button>
      ),
      key: "1",
    },
  ];

  const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  );

  return (
    <div className="flex items-center justify-between w-full gap-3 px-5 py-3 border border-r-0 border-gray-300 ">
      <div className="flex items-center gap-4">
        <Avatar className="uppercase bg-primary-soft text-primary">
          {userLogged?.name?.[0]}
        </Avatar>

        <div className="flex flex-col font-medium ">
          {/* Name lastname */}
          <Tooltip
            placement="top"
            className="cursor-pointer"
            title={userLogged?.name + " " + userLogged?.lastname}
          >
            <p className="text-sm">
              {truncate(userLogged?.name)} {truncate(userLogged?.lastname)}
            </p>
          </Tooltip>

          {/* Email */}
          <Tooltip
            placement="top"
            className="cursor-pointer"
            title={userLogged?.email}
          >
            <p className="text-xs">{truncate(userLogged?.email, 20)}</p>
          </Tooltip>

          {/* rol */}
          <p className="mt-1 text-xs text-text-secondary">
            Rol: {userLogged?.role}
          </p>
        </div>
      </div>

      {/* Config */}
      <div>
        <Dropdown
          menu={{
            items,
          }}
          trigger={["click"]}
        >
          <a onClick={(e) => e.preventDefault()}>
            <ConfigIcon className="size-5 text-text-secondary" />
          </a>
        </Dropdown>
      </div>
    </div>
  );
};
