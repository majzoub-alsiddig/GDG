import coverImg from "@/../assets/contact-cover.jpg";

const Header = () => {
  return (
    <header className="relative h-60 w-full overflow-hidden flex items-center justify-center text-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${coverImg.src})` }}
      >
        <div className="absolute inset-0 bg-black/70" />
      </div>
      <div className="relative">
        <h2 className="text-3xl text-center m-10 text-blue-500 font-bold">Contact US</h2>

      </div>
    </header>
  );
};

export default Header;

