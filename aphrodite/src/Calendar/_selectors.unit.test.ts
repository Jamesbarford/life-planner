import * as moment from "moment";
import { Map, List } from "immutable";
import { selectMomentFromMap } from "./selectors";
import { createHash } from "./factories";
import { TimePoint, calculate } from "../helpers/dateHelper";

describe("date hash map selectors", () => {
  it("retrieves list of moments from hash map", () => {
    const date = moment().startOf("day");
    const momentList = List(calculate(date, TimePoint.month, 1));
    const hash = createHash(date, TimePoint.month);
    const dateHashMap = Map({ [hash]: momentList });
    const selectedList = selectMomentFromMap(hash, dateHashMap);

    expect(selectedList).toEqual(momentList);
  });
});
