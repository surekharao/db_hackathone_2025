import { useNavigate } from "react-router";

const LoginPage = () => {
  const navigate = useNavigate();
  const onLogin = () => {
    navigate("/game");
  };
  return (
    <div className="m-auto">
      <button
        className="rounded-md block border-2 border-[#2d64f6]  bg-[#2d64f6] text-white text-center px-4 py-2 my-4 mx-auto cursor-pointer text-sm transition-all duration-300 hover:bg-[#2450c4] hover:border-[#2450c4]"
        onClick={onLogin}
      >
        Facebook Login
      </button>
      <button
        className="rounded-md block border-2 border-[#e14645] bg-[#e14645] text-white text-center px-4 py-2 my-4 mx-auto cursor-pointer text-sm transition-all duration-300 hover:bg-[#b43837] hover:border-[#b43837]"
        onClick={onLogin}
      >
        Singpass Login
      </button>
      <button
        className="rounded-md block border-2 text-gray-800 text-center px-4 py-2 my-4 mx-auto cursor-pointer text-sm transition-all duration-300 hover:bg-gray-800 hover:text-white hover:border-gray-800"
        onClick={onLogin}
      >
        Login as Guest
      </button>
    </div>
  );
};

export default LoginPage;
