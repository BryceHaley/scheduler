import React from "react";

import DayList from "./DayList.jsx"
import Appointment from "./Appointment/index.js";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from '../helpers/selectors.js'


import "components/Application.scss";
import useApplicationData from "hooks/useApplicationData.js";

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterviews,
    cancelInterview,
    removeInterviewFromClient
  } = useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviews = getInterviewersForDay(state, state.day);
  
  const appointmentComponents = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview)
    return <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers={dailyInterviews}
      bookInterviews={bookInterviews}
      cancelInterview={cancelInterview}
      removeInterviewFromClient={removeInterviewFromClient}
    />;
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentComponents}
      </section>
    </main>
  );
}
