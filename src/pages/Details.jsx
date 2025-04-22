import { useParams } from "react-router-dom";
import useFetch from "../useFetch";
import Header from "../Components/Header";
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
  rel="stylesheet"
></link>;

const Details = () => {
  const { id } = useParams();

  const { data, loading, error } = useFetch("http://localhost:3000/events");

  console.log(id);
  return (
    <>
      <Header />

      <div className="container-fluid">
        <div className="row">
          {loading && <p>Loading..</p>}
          {data &&
            data
              .filter((item) => item._id == id)
              .map((model) => (
                <>
                  <div className="col-md-6">
                    <h2 className="py-2">{model.eventTitle}</h2>
                    <div className="py-2">
                      <h4 className="opacity-50">Hosted By</h4>
                      <h3 className="text-dark">{model.hostedBy}</h3>
                      <div className="py-4">
                        <img
                          src={model.eventImgUrl}
                          alt="Image"
                          className="img-fluid"
                        />
                      </div>
                      <div className="py-2">
                        <h4 className="py-2">Details</h4>
                        <div className="col-md-7">
                          <p className="fw-semibold">{model.details}</p>
                        </div>
                      </div>
                      <div className="py-2">
                        <h4 className="py-2">Additional Information</h4>
                        <p>
                          <b>Dress Code: </b>
                          {model.additionalInfo.dressCode}
                        </p>
                        <p>
                          <b>Age Restriction: </b>
                          {model.additionalInfo.ageRestriction}
                        </p>
                      </div>
                      <div className="d-flex flex-row mb-3 gap-2 flex-wrap py-2">
                        {model.eventTags &&
                          model.eventTags.map((item) => (
                            <>
                              <button type="button" class="btn btn-primary">
                                {item}
                              </button>
                            </>
                          ))}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <i className="bi bi-calendar-event me-2"></i>
                    <b>Date: </b>
                    <p>{model.eventStartDate.slice(0, 10)}</p>
                    <i className="bi bi-clock me-2"></i>
                    <b>Time:</b>
                    <p>
                      {model.eventStartTime} to {model.eventEndTime}
                    </p>
                    <i className="bi bi-geo-alt me-2"></i>
                    <b>Loaction:</b>
                    <p>{model.eventAddress}</p>
                    <i className="bi  bi-currency-rupee me-2"></i>
                    <b>Price:</b>
                    <p>{model.price}</p>

                    <h2 className="py-2">
                      Speakers: ({model.speakersInfo.length})
                    </h2>
                    <div className="row">
                      {model.speakersInfo.map((item) => (
                        <div className="col-md-3">
                          <div className="card">
                            <div className="card-body">
                              <img
                                src={item.imgUrl}
                                className="card-img-top"
                                height="100"
                                width="80"
                              />
                              <p className="card-title py-2">
                                <b>{item.name}</b>
                              </p>
                              <p className="card-text py-2">{item.post}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                     
                    </div>
                  </div>
                </>
              ))}
        </div>
      </div>
    </>
  );
};
export default Details;
