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
        //console.log(dayEntryAppointmentsArr)
        const appointments = state.appointments;
        appointmentsArr = Object.values(appointments).filter((item)=> dayEntryAppointmentsArr.includes(item.id))
      }
  }
  return appointmentsArr;
};