import dayjs from "dayjs";
import "dayjs/locale/es";

dayjs.locale("es");

export default function formatDate(date: string) {
  if (date) {
    return dayjs(date).format("DD-MM-YYYY HH:mm");
  }
  return "-";
}
