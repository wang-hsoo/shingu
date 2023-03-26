import { useSetRecoilState } from "recoil";
import { getDivision } from "../service/EtcService";
import { Idivision } from "../service/Interface";
import { isDivision } from "../store/atom";



export const GetDivisionName = (divisionCode: Number) => {
    const divisionN = useSetRecoilState(isDivision);

    return getDivision().then((value: Idivision[]) => {
      const division = value.find((division: Idivision) => divisionCode === division.divisioncode);
      if (division) {
        divisionN(division.divisionname as string);
        return division.divisionname;
      } else {
        throw new Error(`Division not found for code ${divisionCode}`);
      }
    });
  }
