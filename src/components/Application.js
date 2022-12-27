import React, { useState, useEffect } from "react";
import axios from "axios";

import DayList from "./DayList.jsx"
import Appointment from "./Appointment/index.js";
import { getAppointmentsForDay, getInterview } from '../helpers/selectors.js'

import "components/Application.scss";

const GET_DAYS = "http://localhost:8001/api/days"
const GET_APPOINTMENTS = "http://localhost:8001/api/appointments"
const GET_INTERVIEWERS = "http://localhost:8001/api/interviewers"


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    interviewers: {},
    appointments: {}
  });



  const setDay = day => setState(prev => ({ ...prev, day }));

  useEffect(()=> {
    Promise.all([
      axios.get(GET_DAYS),
      axios.get(GET_APPOINTMENTS),
      axios.get(GET_INTERVIEWERS)
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })
  }, []);

  let dailyAppointments = getAppointmentsForDay(state, state.day);

  const appointmentComponents = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview)
    return <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
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
