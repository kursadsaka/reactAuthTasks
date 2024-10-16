import StartingPageContent from "../components/StartingPage/StartingPageContent";
import TasksPageContent from "../components/TasksPage/TasksPageContent";
import { useFirebaseAuth } from "../store/firebase-auth-context";

const HomePage = () => {
  const { currentUser } = useFirebaseAuth();
  const isUserLoggedIn = !!currentUser;

  return (
    <div style={{ padding: "20px" }}>
      <StartingPageContent isLoggedIn={isUserLoggedIn} />
      {isUserLoggedIn && <TasksPageContent />}
    </div>
  );
};

export default HomePage;
