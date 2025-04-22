import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import useFetch from "../useFetch";
const Home = () => {
  const [saveddata, setsavedData] = useState([]);


  const { data, error, loading } = useFetch("https://meetup-backend-rho.vercel.app/events");
  const set = () => {
    if (data) {
      console.log(data);
      setsavedData(data);
    }
  };
  useEffect(() => {
    set();
 
  }, [data]);

  const eventType = (input)=>{
    if(input !== "All"){
      const eventfilter = data.filter((item)=> item.eventType == input)
      console.log(input)
      console.log(eventfilter)
      setsavedData(eventfilter)
    }else{
      setsavedData(data)
    }

  }

  const filterData = (input) => {
    if (input) {
      const newdata = saveddata.filter(
        (item) =>
          item.eventTitle.toLowerCase().includes(input.toLowerCase()) ||
          item.eventTags.some((tag) =>
            tag.toLowerCase().includes(input.toLowerCase())
          )
      );
      setsavedData(newdata);
    } else {
      setsavedData(data);
    }
  };
  return (
    <>
   
      <div className="d-flex justify-content-between align-items-center bg-body-tertiary py-3 px-4">
        <h1 className="fs-1 mb-0">Meetup Events</h1>
     
        <div className="d-flex align-items-center gap-2 mx-5">
          <form className=" d-flex " role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search by titles and tags"
              aria-label="Search"
              onChange={(e) => filterData(e.target.value)}
            />
          </form>
        </div>

        <div className="d-flex justify-content-between  mx-5">
          <select className="form-select w-auto" onChange={(e)=>eventType(e.target.value)}>
            <option value="All">Select Event Type</option>
            <option value="Offline">Offline</option>
            <option value="Online">Online</option>
          </select>
        </div>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error occured while fetching data.</p>}
      <div className="container-fluid py-2">
        <div className="row py-4">
          {saveddata.map((item) => (
            
              <div className="col-md-4 pb-4">
                <Link to={`/events/${item._id}`}   className="text-decoration-none text-dark">
                <div className="card ">
                  <img
                    src={item.eventImgUrl}
                    className="card-img-top"
                    width="900"
                    height="300"
                  />
                  <div className="py-2">
                  <span className="badge text-bg-dark position-absolute top-0 end-80 py-2">{item.eventType} Event</span>
                  </div>
                  <div className="card-text">
                    <h6 className="card-subtitle  my-1 mx-2 text-body-secondary">
                      {item.eventStartDate}
                      {" ."} {item.eventStartTime}
                    </h6>
                    <h2 className="mx-2 text-semibold">{item.eventTitle}</h2>
                  </div>
                </div>
            </Link>

              </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Home;
