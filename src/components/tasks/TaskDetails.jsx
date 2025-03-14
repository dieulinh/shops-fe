import {useState,useEffect} from "react";

export default function TaskDetails({task}) {
  return (
    <div>
      <h2>{task.text}</h2>
      <p><a href={task.meeting_url} target={"_blank"}> {task.meeting_url}</a></p>
    </div>
  )
}