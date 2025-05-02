import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from '@fullcalendar/timegrid';
import {createEventAsync} from "@/features/calendars/calendarSlice.js";
import {useDispatch} from "react-redux";
import {useState} from "react";
import {useSelector} from "react-redux";


function Calendar() {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false)
  const [title,setTitle] = useState('')
  const [eventDate,setEventDate] = useState(null)
  const event = useSelector((state) => state.calendar.event)
  const onClose = () => {
    setModalOpen(false)
  }
  const handleDate = (info) => {
    setModalOpen(true)
    alert('Clicked on: ' + info.dateStr)
    console.log(info.date)
    setEventDate(info.dateStr)
  }
  const handleChange = (e) => {
    setTitle(e.target.value)
  }
  const saveEvent = () => {
    dispatch(createEventAsync({event: {start_time: eventDate,title: title}}))
    onClose()
  }
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}

        selectable={true}
        selectMirror={true}
        dateClick={handleDate}
      />
      {modalOpen && <div id="myModal" className={'modal modal-open'}>
        <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          <h2>Modal </h2>
          <p>You select Time: {eventDate}</p>
          <input type={"date"} value={eventDate}/>
          <input onChange={handleChange} placeholder='Event title'/>
          <button onClick={saveEvent}>Save</button>
        </div>
      </div>}
    </>
  )
}

export default Calendar

