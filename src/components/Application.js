import React, { useState, useEffect } from "react";
import axios from "axios";

import DayList from "./DayList.jsx"
import Appointment from "./Appointment/index.js";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from '../helpers/selectors.js'

import "components/Application.scss";

const DAYS = "http://localhost:8001/api/days"
const APPOINTMENTS = "http://localhost:8001/api/appointments"
const INTERVIEWERS = "http://localhost:8001/api/interviewers"

export default function Application(props) {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    interviewers: {},
    appointments: {}
  });

  useEffect(()=> {
    Promise.all([
      axios.get(DAYS),
      axios.get(APPOINTMENTS),
      axios.get(INTERVIEWERS)
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })
  }, []);

  const setDay = day => setState(prev => ({ ...prev, day }));
  
  const bookInterviews = async (id, interview) => {
    //console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    //console.log(interview);
    
    const response =  await axios.put(APPOINTMENTS + "/" + id, appointment)
      .then(setState({...state, appointments}))
    
      return response;
  }

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
