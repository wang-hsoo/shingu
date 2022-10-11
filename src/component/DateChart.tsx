import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";


function DateChart(){
    const [date, setDate] = useState<Date>(new Date());
    const [selectDate, setSelectDate] = useState<string>();
 
    
   

    return(
        <div>
            일별 차트
            <DatePicker
                selected={date}
                onChange={(date:Date) => {
                    const Date = date.toLocaleDateString();
                    setDate(date);
                    setSelectDate(Date);
                }}
                dateFormat="yyyy-MM-dd (eee)"
                locale={ko}
            />
        </div>
    )
}

export default DateChart;