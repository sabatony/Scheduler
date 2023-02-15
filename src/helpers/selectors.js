export function getAppointmentsForDay(state, day) {
  const results = [];
  for (const dayArray of state.days) {
    if (dayArray.name === day) {
      for (const appointment of dayArray.appointments) {
        if (state.appointments[appointment]) {
          results.push(state.appointments[appointment]);
        }
      }

    }
  }




  return results;


}