import React from "react"
import "./styles.scss"
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";


const EMPTY   = "EMPTY";
const SHOW    = "SHOW";
const CREATE  = "CREATE"

export default function Appointment (props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterviews(props.id, interview);
    transition(SHOW);
  }

  return <article className="appointment">
    <Header time={props.time}></Header>
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
      />
    )}
    {mode === CREATE && <Form
    interviewers={props.interviewers}
    onCancel={back}
    onSave={save}
    ></Form>}
      
  </article>
}