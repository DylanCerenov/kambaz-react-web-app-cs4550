import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/1234/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/reactjs.jpg" width={200} />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer{" "}
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/4400/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/programming-languages.jpg" width={200} />
            <div>
              <h5> CS4400 Programming Languages </h5>
              <p className="wd-dashboard-course-title">
                Programming Languages!{" "}
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/4550/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/web-dev.jpg" width={200} />
            <div>
              <h5> CS4550 Web Dev </h5>
              <p className="wd-dashboard-course-title">Learn Web Dev! </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/4700/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/networks.jpg" width={200} />
            <div>
              <h5> CS4700 Networks </h5>
              <p className="wd-dashboard-course-title">Networks </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/3000/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/algorithms.jpg" width={200} />
            <div>
              <h5> CS3000 Algorithms </h5>
              <p className="wd-dashboard-course-title">Learn algorithms! </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/4730/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/dist-sys.jpg" width={200} />
            <div>
              <h5> CS4730 Distributed Systems </h5>
              <p className="wd-dashboard-course-title">Distributed Systems! </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/3200/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/databases.jpg" width={200} />
            <div>
              <h5> CS3200 Databases </h5>
              <p className="wd-dashboard-course-title">
                Relational databases!{" "}
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
