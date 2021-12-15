import { useContext, useEffect } from "react";
import "./App.css";
import "@rocket.chat/icons/dist/rocketchat.css";
import Login from "./views/Login/Login";
import Reminders from "./views/Home/RemindersList";
import Profile from "./views/Profile/Profile";
import { useHistory } from "react-router-dom";
import RemindersProvider from "./contexts/reminders/RemindersProvider";
import { UserContext } from "./contexts/user/LoggedInUser";
import { Route, useLocation } from "react-router-dom";
import { Box } from "@rocket.chat/fuselage";

export default function App() {
  const { isLoggedIn } = useContext(UserContext);
  const { push } = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/profile") {
      if (isLoggedIn()) {
        push("/reminders");
      } else {
        push("/");
      }
    }
  }, [isLoggedIn, push, location.pathname]);

  return (
    <Box
      flexDirection="column"
      textAlign="center"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Route exact path="/" component={Login} />
      <RemindersProvider>
        <Route path="/reminders" component={Reminders} />
        <Route path="/profile" component={Profile} />
      </RemindersProvider>
    </Box>
  );
}
