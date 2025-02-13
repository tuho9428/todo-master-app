import React from "react";
import { Dropdown } from "@mui/base/Dropdown";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuButton from "../components/Profile/MenuButton";
import MenuItem from "../components/Profile/MenuItem";
import AnimatedListbox from "../components/Profile/AnimatedListbox";
import { Menu } from "@mui/base/Menu";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUserThunk } from "../store/auth/authThunk";

const ProfileDropdown = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUserThunk()).then(() => navigate("/login"));
  };

  const handleToProfile = () => {
    navigate("/user/profile");
  };

  const handleNavigateTodos = () => {
    navigate("/app/todos");
  };

  return (
    <Dropdown>
      <MenuButton>
        <AccountCircleIcon />
      </MenuButton>
      <Menu slots={{ listbox: AnimatedListbox }}>
        <MenuItem onClick={handleNavigateTodos}>Todos</MenuItem>
        <MenuItem onClick={handleToProfile}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Log out</MenuItem>
      </Menu>
    </Dropdown>
  );
};

export default ProfileDropdown;
