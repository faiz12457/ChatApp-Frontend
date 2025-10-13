
import { useLogout } from "../../hooks/useLogout";

function LogoutButton({ text = "Logout" }) {
  const {logout,submitting}=useLogout();
 
  return (
    <button
      onClick={logout}
      disabled={submitting}
      style={{ background: " linear-gradient(to right, #c77dff, #8c36ff)" }}
      className=" w-[279px]
       cursor-pointer h-12 rounded text-white
        flex justify-center items-center text-base font-medium disabled:cursor-not-allowed"
    >
      {submitting ? (
        <span className="size-7  block rounded-full border-4 border-t-transparent border-white animate-spin"></span>
      ) : (
        text
      )}
    </button>
  );
}

export default LogoutButton;
