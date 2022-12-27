
/*Helper function takes in a state object and a day string
returns array of appointments in the form of their integer keys */
export function getAppointmentsForDay(state, day) {
  let appointmentsArr = [];
    //return empty array if state has no days
    if (state.days.length !== 0) {
      const dayEntries = state.days.filter(entry => entry.name === day);
      //return empty array if there are no appts in the day selected
      if (dayEntries) {
        let dayEntryAppointmentsArr = [];
        for (const entry in dayEntries) {
          dayEntryAppointmentsArr = dayEntryAppointmentsArr.concat(dayEntries[entry].appointments);
        }
        const appointments = state.appointments;
        appointmentsArr = Object.values(appointments).filter((item)=> dayEntryAppointmentsArr.includes(item.id))
      }
  }
  return appointmentsArr;
};
/*Helper function takes in a state object and an interview object
returns an object of with detailed interviewer infomation added to the interview object*/
export function getInterview(state, interview) {
  if (!interview) {return null}
  const id = interview.interviewer;

  let retObj = {
    student: interview.student,
    interviewer: {
      id: state.interviewers[id].id,
      name: state.interviewers[id].name,
      avatar: state.interviewers[id].avatar
    }
  };
  return retObj;
};

/** Helper function takes in a state object and a day string
 * returns an array of integers whose entries are integer keys for available interviewers
 */
export function getInterviewersForDay(state, day) {
  let interviewersArr = [];
  for (const dayEntry of state.days) {
    interviewersArr = dayEntry.name === day ? interviewersArr.concat(dayEntry.interviewers) : interviewersArr;
  }
  interviewersArr = interviewersArr.map(entry => state.interviewers[entry]);


  return interviewersArr;
}