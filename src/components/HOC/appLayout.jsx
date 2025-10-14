import { useSelector } from "react-redux";
import Title from "../shared/Title";
import Header from "./Header";
import { selectLoginUser } from "../../redux/slices/auth/authSlice";
import UserProfile from "../UserProfile";
import ChatList from "../ChatList";
import { useParams } from "react-router-dom";

export const AppLayout = () =>(Component)=> {
   
  return function (prop) {

     const user=useSelector(selectLoginUser);
     const params=useParams();
    
     const {chatId}=params;

     const handleDeleteChat=(id,groupChat)=>{
    //  e.preventDefault();
      

     }

    return (
      <>
        <Title />
        <Header />

        <div className="grid grid-cols-1  sm:grid-cols-[1fr_2fr]
         md:grid-cols-[1fr_2fr_1fr]   h-[calc(100vh-4rem)] ">
            <div className="hidden sm:block  h-full">
               <ChatList handleDeleteChat={handleDeleteChat} />
            </div>

            <div className="h-full   text-"><Component {...prop} /></div>


            <UserProfile user={user} />
        </div>
        
      </>
    );
  };
};



