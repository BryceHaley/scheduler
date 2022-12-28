import React from "react"
import "./styles.scss"
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";


const EMPTY     = "EMPTY";
const SHOW      = "SHOW";
const CREATE    = "CREATE";
const SAVING    = "SAVING";
const DELETING  = "DELETING";
const CONFIRM   = "CONFIRM";
const EDIT      = "EDIT"

export default function Appointment (props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  console.log(props.interview);
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

  const deleteInterview = async () => {
    transition(DELETING);
    const res = await props.cancelInterview(props.id);

    if(res.status === 204) {
      transition(EMPTY);
      props.removeInterviewFromClient(props.id)
    } else {
      transition(SHOW);
    }
  }

  

  return <article className="appointment">
    <Header time={props.time}></Header>
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SAVING && <Status message={"Saving..."}/>}
    {mode === DELETING && <Status message={"Deleting..."}/>}
    {mode === CONFIRM && <Confirm 
      message={"Are you sure you want to delete?"}
      onCancel={back}
      onConfirm={deleteInterview}
    ></Confirm>}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={()=>transition(CONFIRM)}
        onEdit={() => transition(EDIT)}
      />
    )}
    {mode === CREATE && <Form
    interviewers={props.interviewers}
    onCancel={back}
    onSave={save}
    ></Form>}
    {mode === EDIT && <Form
      interviewers={props.interviewers}
      onCancel={back}
      onSave={save}
      student={props.interview.student}
      interviewer={props.interview.interviewer.id}>
    </Form>}
      
  </article>
}