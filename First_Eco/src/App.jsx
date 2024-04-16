import { Profile } from "./components/Profile/Profile";
import UserContextProvider from "./context/UserContextProvider";
import ApplicationUISignIn from "./components/ApplicationUISignIn/ApplicationUISignIn";

function App() {
  return (
    <UserContextProvider>
      <ApplicationUISignIn />
      <Profile />
    </UserContextProvider>
  );
}

export default App;
