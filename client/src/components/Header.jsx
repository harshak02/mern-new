import React from "react";
import { Navbar, TextInput, Button } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { IoMoon } from "react-icons/io5";

const Header = () => {
  const path = useLocation().pathname;
  return (
    <Navbar className="shadow-xl">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-400  text-white rounded">
          Innovate's
        </span>
        <span>Hub</span>
      </Link>
      <form>
        <TextInput
          type="text"
          placeholder="Hunt any ..."
          rightIcon={AiOutlineSearch}
          className="hidden md:inline"
        />
      </form>
      <Button
        className="h-8 w-10 md:hidden"
        gradientDuoTone="purpleToBlue"
        pill
      >
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-2 md:order-2 items-center">
        <Button
          className="h-8 sm:inline"
          outline
          gradientDuoTone="purpleToBlue"
          pill
        >
          <IoMoon />
        </Button>
        <Link to="/sign-in" className="">
          <Button className="h-10" outline gradientDuoTone="purpleToBlue">
            Sign In
          </Button>
        </Link>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path == "/"} as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path == "/about"} as={"div"}>
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link active={path == "/projects"} as={"div"}>
          <Link to="/projects">Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
