"use client";
import logoHorizontal from "../../public/logo/logo-horizontal_730x209.png"

const Login: React.FC = () => {
  // TODO: Add form state
  // TODO: Add error handling
  // TODO: Add loading state
  // TODO: Add authentication logic
  // TODO: Add styling
  // TODO: Add form validation

  return (
    <div className="flex flex-col items-center">
      <div className="border border-neon-pink rounded-lg p-8 m-16 min-w-[20%] bg-login-bg-purple/[24%] overflow-hidden shadow-xl/20 shadow-[0_3px_35px_#F88AFF] grid h-96 w-80 grid-rows-9">
        <img src={"../../public/logo/logo-horizontal_730x209.png"}/>
        <h1 className="text-white text-center font-nunito text-4xl">Register</h1>
        <form className="grid grid-cols-1 grid-rows-3 content-center justify-center row-start-3 row-end-9 gap-2">
          <input className="h-10 rounded-2xl m-1 border border-white bg-neon-pink/[10%] p-4 text-white" type="text" placeholder="Username" />
          <input className="h-10 rounded-2xl m-1 border border-white bg-neon-pink/[10%] p-4 text-white" type="password" placeholder="Password" />
          <button className="h-10 bg-gray-200 rounded-full m-1 text-lg font-bold" type="submit">Register</button>
        </form>
        <p className="text-white text-center text-xs">Already have an account? Login</p>
      </div>
      
    </div>
  );
};

export default Register;
