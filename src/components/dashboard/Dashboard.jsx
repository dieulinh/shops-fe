import {useEffect}  from "react";

export const Dashboard = () => {
  useEffect(() => {
    document.title = 'Dashboard'
  },[])

  return (
    <div className={'dashboard'}>
      <h1>Dashboard</h1>
      <div className={'dashboard-content'}>
        <div className={'dashboard-item'}>
          <h2>Jobs</h2>
        </div>
        <div className={'dashboard-item'}>
          <h2>Products</h2>
        </div>
      </div>
    </div>
  )
}