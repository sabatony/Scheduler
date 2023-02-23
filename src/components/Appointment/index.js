import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "./Status";
import Confirm from "./Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  function save(name, interviewer) {

    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);

    props.bookInterview(props.id, interview).then(() => {
      transition(SHOW);
    });
  }

  function deleteAppointment() {
    transition(DELETING);
    Promise.resolve(props.cancelInterview(props.id))
    .then(() => transition(EMPTY))
  }

  function confirmDelete () {
    transition(CONFIRM);
  }


  return (
    <article className="appointment">
      <Header
        time={props.time}
      />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer} onEdit={() => transition(EDIT)} onDelete={confirmDelete} />}
      {mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel={() => back()} />}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && <Confirm message="Are you sure you want to delete?" onConfirm={deleteAppointment} onCancel={() => back()}/> }
      {mode === EDIT && <Form interviewer={props.interview.interviewer.id} student={props.interview.student} interviewers={props.interviewers} onCancel={() => back()} onSave={save}/>}
    </article>
  );
}