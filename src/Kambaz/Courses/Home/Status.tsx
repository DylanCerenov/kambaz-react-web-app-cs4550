import { Button } from "react-bootstrap";
import { LuDownload } from "react-icons/lu";
import { CiLogout } from "react-icons/ci";
import { FaBell, FaCheckCircle } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { MdDoNotDisturbAlt, MdOutlineBarChart } from "react-icons/md";
import { TfiAnnouncement } from "react-icons/tfi";

export default function CourseStatus() {
  return (
    <div className="text-nowrap">
      <h2>Course Status</h2>
      <div className="d-flex">
        <div className="w-50 pe-1">
          <Button variant="secondary" size="lg" className="w-100 text-nowrap ">
            <MdDoNotDisturbAlt className="me-2 fs-5" /> Unpublish{" "}
          </Button>{" "}
        </div>
        <div className="w-50">
          <Button variant="success" size="lg" className="w-100">
            <FaCheckCircle className="me-2 fs-5" /> Publish{" "}
          </Button>{" "}
        </div>
      </div>

      <br />
      <div className="pb-1">
        <Button
          variant="secondary"
          size="lg"
          className="me-1 w-100 text-start"
          id="wd-import-existing-content"
        >
          <LuDownload />
          {" Import Existing Content"}
        </Button>
      </div>

      <div className="pb-1">
        <Button
          variant="secondary"
          size="lg"
          className="me-1 w-100 text-start"
          id="wd-import-from-commons"
        >
          <CiLogout />
          {" Import from Commons"}
        </Button>
      </div>

      <div className="pb-1">
        <Button
          variant="secondary"
          size="lg"
          className="me-1 w-100 text-start"
          id="wd-choose-home-page"
        >
          <IoMdHome />
          {" Choose Home Page"}
        </Button>
      </div>

      <div className="pb-1">
        <Button
          variant="secondary"
          size="lg"
          className="me-1 w-100 text-start"
          id="wd-view-course-stream"
        >
          <MdOutlineBarChart />
          {" View Course Stream"}
        </Button>
      </div>

      <div className="pb-1">
        <Button
          variant="secondary"
          size="lg"
          className="me-1 w-100 text-start"
          id="wd-new-announcement"
        >
          <TfiAnnouncement />
          {" New Announcement"}
        </Button>
      </div>

      <div className="pb-1">
        <Button
          variant="secondary"
          size="lg"
          className="me-1 w-100 text-start"
          id="wd-new-analytics"
        >
          <MdOutlineBarChart />
          {" New Analytics"}
        </Button>
      </div>

      <div className="pb-1">
        <Button
          variant="secondary"
          size="lg"
          className="me-1 w-100 text-start"
          id="wd-view-course-notifications"
        >
          <FaBell />
          {" View Course Notifications"}
        </Button>
      </div>
    </div>
  );
}
