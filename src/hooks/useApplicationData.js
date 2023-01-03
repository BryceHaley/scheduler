import { useState, useEffect } from "react";
import axios from "axios";

const DAYS = "/api/days"
const APPOINTMENTS = "/api/appointments"
const INTERVIEWERS = "/api/interviewers"

export default function useApplicationData() {


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

  const updateSpots = function(num) {
    let dayId;
    for (const dayObj of state.days) {
      if (dayObj.name === state.day) {
        dayId = dayObj.id;
      }
    }
 
    setState(prev => {
      const updatedDays = [...prev.days];
      updatedDays[dayId-1] = {...prev.days[dayId-1]}
      updatedDays[dayId-1].spots = updatedDays[dayId-1].spots + num;
      return {...prev, days: updatedDays}
    });
  }

  const bookInterviews = async (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    const response =  await axios.put(APPOINTMENTS + "/" + id, appointment)
      if (response.status === 204) {
        setState({...state, appointments});
        updateSpots(-1);
      }
      return response;
  };

  const cancelInterview = async (id) => {

    const response = await axios.delete(APPOINTMENTS + "/" + id)
    
    return response;
  };

  const removeInterviewFromClient = function(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({...state, appointments})
    updateSpots(1);
  }

  return {state, setDay, bookInterviews, cancelInterview, removeInterviewFromClient}
};