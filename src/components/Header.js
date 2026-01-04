import Image from "next/image";

const Header = () => {
  return (
    <nav className="flex justify-center items-center  h-20">
      <div className="mainContainer flex justify-between items-center">
        <div className="w-[155px] h-[65px]">
          <Image
            src="/images/logo1.png"
            alt=""
            width={149}
            height={60}
            className="w-full h-auto"
          />
        </div>
        <div>
          <ul className="uppercase flex gap-[90px] text-[#45414F]">
            <li>about</li>
            <li>help</li>
            <li>login</li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
