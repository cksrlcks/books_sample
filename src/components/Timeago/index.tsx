import { format, register } from "timeago.js";
import { ko } from "timeago.js/lib/lang";
register("ko", ko);

export default function Timeago({ date }: { date: string }) {
  return <>{format(date, "ko")}</>;
}
