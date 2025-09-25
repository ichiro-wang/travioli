import { Settings, UserRound } from "lucide-react";
import Logo from "./Logo";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { NavigationMenu, NavigationMenuList } from "./ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import SearchDropdown from "./SearchDropdown";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <NavigationMenu
      viewport={false}
      className="flex-none py-2 border-b-slate-500 border-b-1 z-50"
    >
      <NavigationMenuList className="gap-3">
        <NavigationMenuItem>
          <Logo width={35} className="mx-3" sendHome={true} />
        </NavigationMenuItem>

        {/* search dropdown is its own MenuItem */}
        <SearchDropdown />

        <NavigationMenuItem>
          <NavigationMenuTrigger
            showDownIcon={false}
            onClick={() => navigate("/create")}
          >
            Create
          </NavigationMenuTrigger>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="gap-2">
            <Avatar>
              <AvatarImage src={user?.profilePic} />
              <AvatarFallback>PFP</AvatarFallback>
            </Avatar>
            Account
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul>
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    to={`/${user.username}`}
                    className="flex-row items-center gap-2"
                  >
                    <UserRound />
                    Profile
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link to="/settings" className="flex-row items-center gap-2">
                    <Settings />
                    Settings
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <LogoutButton />
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navbar;
