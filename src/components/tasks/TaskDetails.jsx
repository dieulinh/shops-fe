import {useState,useEffect} from "react";

export default function TaskDetails({task, handleUpdateDetails}) {
  return (
    <div>
      <h2>{task.text}</h2>
      <p><a href={task.meeting_url} target={"_blank"}> {task.meeting_url}</a></p>
      <div>
        <textarea rows={10} id={"task-details"}></textarea>
        <button onClick={handleUpdateDetails}>Update</button>
      </div>
    </div>
  )
}