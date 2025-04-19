import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
export default function ProtectedCourseRoute({ children }: { children: any }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { cid } = useParams();
  const { enrollments } = useSelector((state: any) => state.enrollmentReducer);

  let condition: boolean = enrollments.some(
    (enrollment: { user: any; course: any }) =>
      enrollment.user === currentUser._id && enrollment.course === cid
  );

  if (currentUser && condition) {
    return children;
  } else {
    return <Navigate to="/Kambaz/Dashboard" />;
  }
}
