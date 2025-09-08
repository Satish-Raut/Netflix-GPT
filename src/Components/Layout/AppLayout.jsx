import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";

export const AppLayout = () => {
  return (
    <>
      <div
        className="min-h-screen bg-cover bg-center flex flex-col"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.9) 1%, rgba(0,0,0,0.7) 10%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.8) 100%), url('https://assets.nflxext.com/ffe/siteui/vlv3/8d617e19-3c3c-4c28-8998-c9b14dbc7200/web/IN-en-20250901-TRIFECTA-perspective_48d84d4e-9558-46b8-a0f3-8b2dc8478431_small.jpg')`,
        }}
      >
        <Header />

        {/* <Home /> */}

        <Outlet />
      </div>
      <Footer />
    </>
  );
};
