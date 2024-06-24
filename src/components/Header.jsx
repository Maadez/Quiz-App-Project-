import { useQuestions } from "../context/QuestionsProvider";
import ToggleDarkModeBtn from "./ToggleDarkModeBtn";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

function Header() {
  const { topicIcon, topicTitle } = useQuestions();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      auth.signOut()
        .then(() => {
          navigate('/login');
        })
        .catch(error => {
          console.error("Error logging out: ", error);
        });
    }
  };

  return (
    <header className="flex h-[70px] items-center justify-center">
      <div className="container mx-auto flex justify-between px-[10px]">
        {topicIcon && (
          <div className="flex items-center gap-[10px]">
            <img src={topicIcon} alt="topic icon" className="w-[35px]" />
            <h3 className="font-bold">{topicTitle}</h3>
          </div>
        )}
        <div className="ml-auto flex items-center gap-[10px]">
          <ToggleDarkModeBtn />
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1.5 rounded-full text-xs hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
