import logo from "./../assets/icon/logo.svg";
import lwsLogo from "./../assets/icon/user-icon.svg";
export default function Header() {
  return (
    <nav className="bg-navbg rounded-full mt-4 px-8 py-3 flex justify-between items-center">
      <div className="flex items-center">
        <div className="text-primary mr-2">
          <img src={logo} />
        </div>
        <h1 className="text-2xl font-bold">
          <span className="text-primary">Dine</span>Out
        </h1>
      </div>
      <div className="flex items-center">
        <img src={lwsLogo} className="h-10" />
      </div>
    </nav>
  );
}
