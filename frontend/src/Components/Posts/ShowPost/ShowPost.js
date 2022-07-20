import Axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import ToText from "../../../utils/ToText";
import "./ShowPost.css";
import avtar from "../../../assets/avtar.jpg";
import Spinner from "../../../Containers/Spinner/Spinner";

// show posts in main ui

function ShowPost(props) {
  const [post, setpost] = useState(props);
  const [loading, setLoading] = useState(false);
  const [errmsg, setErrorMsg] = useState();
  const [errcode, setErrorCode] = useState();
  const history = useHistory();
  const [showMore, setShowMore] = useState(false);
  const { text } = ToText;
  const pathname = history.location.pathname;

// use efect 
  useEffect(() => {
    setLoading(true);
    Axios.get("/profile/bycreator/" + props.creator)
      .then((data) => {
        setLoading(false);
        setpost({ ...props, user: data.data.profile });
      })
      .catch((e) => {
        setLoading(false);
      });
  }, [props]);

  return (
    <>
      {errcode ? (
        <div className="container error container-short">
          <div className="mar-20">
            <h5>Error Code - {errcode}</h5>
            <h4>Error Message - {errmsg}</h4>
          </div>
        </div>
      ) : null}

      {loading ? (
        <div className="container loading">
          <div className="mar-20">
            <Spinner />
          </div>
        </div>
      ) : null}
      <div className="col-md-6 col-sm-6 col-xs-12 showblog mb-3">
        <div className="showblog_card card">
          <div
            className="showblog_card_image"
            style={{ backgroundImage: `url(${props.imagePath})` }}
          >
            <div className="show_auth_img">
              <Link
                to={"/public/" + post.user?.username}
                style={{
                  backgroundImage: `url(${
                    post.user?.imagePath ? post.user.imagePath : avtar
                  })`,
                }}
              >
                By sandaru
              </Link>
            </div>
          </div>
          <div className="card-body">
            <h5 className="card-title pt-3">
              {pathname === "/mypost" ? (
                <Link to={"/mypost/" + props._id} className="title">
                  {props.title}
                </Link>
              ) : (
                <Link to={"/post/" + props._id} className="title">
                  {props.title}
                </Link>
              )}
            </h5>

            <p className="showblog_content">
              {( `${ToText(props.content.substring(0, 170))}`) } 
              <span>
                {showMore
                  ? `${ToText(props.content.substring(170, 500))}.....`
                  : ToText}
                <button
                  style={{
                    color: '#123597',
                  }}
                  className="btn"
                  onClick={() => setShowMore(!showMore)  }
                >
                    {showMore ? "Show less" : "Show more"}  
                </button>
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default ShowPost;
