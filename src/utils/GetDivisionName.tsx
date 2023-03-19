import { getDivision } from "../service/EtcService";
import { Idivision } from "../service/Interface";



export const GetDivisionName = (divisionCode: Number) => {
    return getDivision().then((value: Idivision[]) => {
      const division = value.find((division: Idivision) => divisionCode === division.divisioncode);
      if (division) {
        return division.divisionname;
      } else {
        throw new Error(`Division not found for code ${divisionCode}`);
      }
    });
  }
