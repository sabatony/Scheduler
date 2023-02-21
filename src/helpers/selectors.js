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

export function getInterview(state, interview){
  if(interview) {
    const interviewer = state.interviewers[interview.interviewer]
    return {...interview, interviewer}
  }
  
  return null;

}

export function getInterviewersForDay(state, day) {
  const results = [];
  for (const dayArray of state.days) {
    if (dayArray.name === day) {
      for (const interviewer of dayArray.interviewers) {
        if (state.interviewers[interviewer]) {
          results.push(state.interviewers[interviewer]);
        }
      }
    }
  }
  return results;
}