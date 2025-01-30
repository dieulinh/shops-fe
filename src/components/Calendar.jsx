import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction"


function Calendar({...props}) {
  console.log(props)
  const handleDate = (date) => {
    console.log(date)

  }
  return (

    <FullCalendar
      plugins={[ dayGridPlugin, interactionPlugin ]}
      initialView="dayGridMonth"
      selectable={true}
      selectMirror={true}
      dateClick={function(info) {
        alert('Clicked on: ' + info.dateStr);
      }}
    />
  )
}
export default Calendar

