import React from "react"
import "./styles.scss"
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";


const EMPTY         = "EMPTY";
const SHOW          = "SHOW";
const CREATE        = "CREATE";
const SAVING        = "SAVING";
const DELETING      = "DELETING";
const CONFIRM       = "CONFIRM";
const EDIT          = "EDIT";
const ERROR_DELETE  = "ERROR_DELETE";
const ERROR_SAVE    = "ERROR_SAVE";

export default function Appointment (props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = async (name, interviewer) => {
    if (name === "" || !interviewer) {
      transition(ERROR_SAVE, true);
    } else {
      const interview = {
        student: name,
        interviewer
      };
      transition(SAVING, true)
      try {
        const res = await props.bookInterviews(props.id, interview);
        if(res.status === 204) {
          transition(SHOW);
        } else {
          transition(ERROR_SAVE, true);
        }
      } catch (error) {
        console.error(error);
        transition(ERROR_SAVE, true);
      }
    }
  }

  const deleteInterview = async () => {
    transition(DELETING, true);
    try {
      const res = await props.cancelInterview(props.id);
      if(res.status === 204) {
        transition(EMPTY);
        props.removeInterviewFromClient(props.id)
      } else {
        transition(ERROR_DELETE, true);
      }
    } catch (error){
      console.error(error);
      transition(ERROR_DELETE, true);
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
    {mode === ERROR_SAVE && <Error
      message={"Failed ot save appointment..."}
      onClose={back}
    ></Error>}
      {mode === ERROR_DELETE && <Error
      message={"Failed ot delete appointment..."}
      onClose={back}
    ></Error>}
      
  </article>
}