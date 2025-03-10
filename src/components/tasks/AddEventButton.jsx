const AddEventButton = ({title, details='', location=''}) => {
  const eventDetails = {
    text: title,
    dates: new Date().toDateString(),
    details: details,
    location: location,
  };

  const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventDetails.text)}&dates=${eventDetails.dates}&details=${encodeURIComponent(eventDetails.details)}&location=${encodeURIComponent(eventDetails.location)}`;

  return (
    <a href={googleCalendarUrl} target="_blank" rel="noopener noreferrer">
      <button className={"primary-button"}>Add Task to Google Calendar</button>
    </a>
  );
};

export default AddEventButton;