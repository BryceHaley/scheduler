import React from "react"
import "./styles.scss"
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";


const EMPTY   = "EMPTY";
const SHOW    = "SHOW";
const CREATE  = "CREATE";
const SAVING  = "SAVING";

export default function Appointment (props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = async (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    const res = await props.bookInterviews(props.id, interview);
    if(res.status === 204) {
      transition(SHOW);
    } else {
      transition(EMPTY);
    }
  }

  return <article className="appointment">
    <Header time={props.time}></Header>
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SAVING && <Status message={"working..."}/>}
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