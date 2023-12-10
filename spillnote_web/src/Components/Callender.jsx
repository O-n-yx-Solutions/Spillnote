import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { createEventId } from './scripts/calendar-util';
import { calendarEvent, getEventsByUserEmail, removeEventFromDatabase } from '../util'; // Import your Firestore functions
import { useAuth } from '../firebase';
import Nav from './Nav';

const Calendar = () => {
  const user = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    // If the user is not authenticated, set isLoggedIn to false
    if (!user) {
      setIsLoggedIn(false);
      return;
    }
    setIsLoggedIn(true);
    // Fetch events from Firestore based on the user's email
    const fetchEvents = async () => {
      try {
        const userEmail = user.email;
        const userEvents = await getEventsByUserEmail(userEmail);
        setEvents(userEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [user]);

  const handleDateSelect = (selectInfo) => {
    let title = prompt('Please enter a new title for your event');
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      const userEmail = user.email;

      const newEvent = {
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        email: userEmail,
      };

      calendarApi.addEvent(newEvent);
      calendarEvent(newEvent); // Save the event to Firestore
    }
  };

  const handleEventClick = (clickInfo) => {
    if (!isLoggedIn) {
      // If not logged in, navigate to the login page
      navigate('/login');
      return;
    }

    if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
      removeEventFromDatabase(clickInfo.event.id, clickInfo.event.title);
      // Remove the event from Firestore as well
      // You need to implement the function to remove events from Firestore
    }
  };

  return (
    <div style={{display:"flex"}}>
        <Nav/>
        <div>
            {!isLoggedIn && (
                <div>
                <p>Looks like you're not logged in.</p>
                <button onClick={() => navigate('/login_page')}>Go to Login Page</button>
                </div>
            )}
            {isLoggedIn && (
                <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                height={"90vh"}
                initialView='dayGridMonth'
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                select={handleDateSelect}
                eventClick={handleEventClick}
                events={events} // Pass the events to FullCalendar
                />
            )}
      </div>
    </div>
  );
};

export default Calendar;
