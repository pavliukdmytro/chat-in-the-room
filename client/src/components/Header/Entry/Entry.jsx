import SignIn from "@/Cabinet/SignIn/SignIn.jsx";
import SignUp from "@/Cabinet/SignUp/SignUp.jsx";

const Entry = () => {
  return(
    <div className="col-md-3 text-end d-flex">
      <SignIn />
      <SignUp />
    </div>
  )
}

export default Entry;