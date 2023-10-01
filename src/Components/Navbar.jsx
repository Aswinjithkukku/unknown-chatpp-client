import { LogoPng } from "../Assets";

function Navbar() {
  return (
    <div className="bg-gray-900 h-20 shadow-zero">
      <div className="max-w-screen-lg mx-auto px-4 h-full">
        <div className="flex justify-between items-center h-full w-full">
          <section className="left flex gap-2 items-center md:justify-normal justify-center w-full ">
            <div className="h-10">
              <img src={LogoPng} alt="Unknownus" className="w-full h-full" />
            </div>
            <h1 className="font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-[#7f53ac] to-[#7f53ac] tracking-wide">
              Unknown Us
            </h1>
          </section>
          <section className="right">
            <div className="h-8 rounded-full overflow-hidden">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=ailey`}
                alt="profile"
                className="w-full h-full "
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
