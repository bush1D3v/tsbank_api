import dayjs from "dayjs";

export default function dateFormatter(date: string) {
  const formattedDate = dayjs(date).subtract(3, "hour").format("YYYY/MM/DD HH:mm:ss");

  return formattedDate;
}
