import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
export default function ProtectedCourseRoute({
  children,
  courses,
  enrolling,
}: {
  children: any;
  courses: any;
  enrolling: boolean;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { cid } = useParams();

  const course = courses.find((c: any) => c._id === cid);
  // If we are in enrolling mode, then the helper method a layer above this
  // Adds a "enrolled" = true field to all classes.
  if (currentUser && enrolling && course.enrolled) {
    return children;
  }
  // If we are not in enrolling mode, then any course in the list is valid.
  else if (currentUser && !enrolling && course) {
    return children;
  } else {
    return <Navigate to="/Kambaz/Dashboard" />;
  }
}
