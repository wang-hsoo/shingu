import { useSetRecoilState } from "recoil";
import { getDivision } from "../service/EtcService";
import { Idivision } from "../service/Interface";
import { isDivision } from "../store/atom";



export const GetDivisionName = async(divisionCode: Number) => {

    return getDivision().then((value: Idivision[]) => {
      const division = value.find((division: Idivision) => divisionCode === division.divisioncode);
      if (division) {
        sessionStorage.setItem("division", division.divisionname as string );
        return division.divisionname;
      } else {
        throw new Error(`Division not found for code ${divisionCode}`);
      }
    });
  }
