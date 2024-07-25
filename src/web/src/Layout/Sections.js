import TopTeams from "../Menus/TopTeams";
import Registar from "../Menus/UserCrud";
import Login from "../Menus/Login";
import NasaCRUD from "../Menus/NasaCrud"


const Sections = [
  {
    id: "top-teams",
    label: "Top Teams",
    content: <TopTeams />
  },

  {
    id: "user-crud",
    label: "User CRUD",
    content: <Registar />
  },

  {
    id: "login",
    label: "Login",
    content: <Login />
  },

  {
    id: "NasaCRUD",
    label: "NasaCRUD",
    content: <NasaCRUD />
  }
];

export default Sections;