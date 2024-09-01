import moment from "moment/moment";

export default function getCurrentTimeStamp(
  timeFormat = "YYYY-MM-DDTHH:mm:ss"
) {
  return moment().format(timeFormat);
}
