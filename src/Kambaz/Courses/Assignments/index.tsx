export default function Assignments() {
  return (
    <div id="wd-assignments">
      <input placeholder="Search for Assignments" id="wd-search-assignment" />
      <button id="wd-add-assignment-group">+ Group</button>
      <button id="wd-add-assignment">+ Assignment</button>
      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button>{" "}
      </h3>
      <ul id="wd-assignment-list">
        {assignmentHelper(
          "123",
          "A1 - ENV + HTML",
          "May 6 at 12:00am",
          "May 13 at 11:59pm"
        )}
        {assignmentHelper(
          "124",
          "A2 - CSS + BOOTSTRAP",
          "May 13 at 12:00am",
          "May 20 at 11:59pm"
        )}
        {assignmentHelper(
          "125",
          "A3 - JAVASCRIPT + REACT",
          "May 20 at 12:00am",
          "May 27 at 11:59pm"
        )}
      </ul>
    </div>
  );
}

function assignmentHelper(
  slug: String,
  title: String,
  startDate: String,
  endDate: String
) {
  return (
    <li className="wd-assignment-list-item">
      <a
        href={`#/Kambaz/Courses/1234/Assignments/${slug}`}
        className="wd-assignment-link"
      >
        {title}
      </a>{" "}
      <div>
        Multiple Modules | <b>Not available until</b> {startDate} |{" "}
      </div>
      <div>
        <b>Due</b> {endDate} | 100 pts
      </div>
    </li>
  );
}
