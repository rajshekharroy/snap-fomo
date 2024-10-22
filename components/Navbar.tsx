import Link from "next/link";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  return (
    <div className="">
      {/* LEFT  */}
      <div>
        <Link href="/"></Link>
      </div>
      {/* CENTER  */}
      <div className=" hidden"></div>
      {/* RIGHT  */}
      <div>
        <MobileMenu />
      </div>
    </div>
  );
};

export default Navbar;
