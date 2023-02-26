import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE ="ERROR_SAVE";
const ERROR_DELETE = "ERROR DELETE";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  function save(name, interviewer) {

    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(err => transition(ERROR_SAVE, true));
  }

  function deleteAppointment() {
    transition(DELETING, true);

    (props.cancelInterview(props.id))
      .then(() => transition(EMPTY))
      .catch(err => transition(ERROR_DELETE, true));
  };

  function confirmDelete() {
    transition(CONFIRM);
  };



  return (
    <article className="appointment">
      <Header
        time={props.time}
      />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer} onEdit={() => transition(EDIT)} onDelete={confirmDelete} />}
      {mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onCancel={back} />}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && <Confirm message="Are you sure you want to delete?" onConfirm={deleteAppointment} onCancel={() => back()} />}
      {mode === EDIT && <Form interviewer={props.interview.interviewer.id} student={props.interview.student} interviewers={props.interviewers} onCancel={() => back()} onSave={save} />}
      {mode === ERROR_SAVE && <Error message="unable to save" onClose={back} />}
      {mode === ERROR_DELETE && < Error message="unable to delete" onClose={back} />}
    </article>
  );
}