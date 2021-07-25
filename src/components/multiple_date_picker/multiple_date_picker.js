import { Calendar, DateObject } from 'react-multi-date-picker';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';
import "react-multi-date-picker/styles/layouts/mobile.css"
import "./multiple_date_picker.css"

export const MultipleDatePicker = (props) => {
  const { values, onChange } = props;
  const currentDate = new Date();

  return (
    <Calendar
      value={values}
      onChange={onChange}
      className="rmdp-mobile crimson"
      months={[
        '1월',
        '2월',
        '3월',
        '4월',
        '5월',
        '6월',
        '7월',
        '8월',
        '9월',
        '10월',
        '11월',
        '12월',
      ]}
      weekDays={['일', '월', '화', '수', '목', '금', '토']}
      multiple
      showOtherDays={true}
      disableYearPicker={true}
      disableMonthPicker={true}
      currentDate={new DateObject()}
      minDate={currentDate.setDate(currentDate.getDate() + 1)}
      maxDate={currentDate.setDate(currentDate.getDate() + 15)}
      plugins={[
        <DatePanel style={{height: 'auto', paddingBottom: '5px'}} sort="date" position="bottom" header="선택한 날짜" />,
      ]}
    />
  );
};
