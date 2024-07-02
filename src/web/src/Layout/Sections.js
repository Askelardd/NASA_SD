import TopTeams from "../Menus/TopTeams";
import Registar from "../Menus/UserCrud";

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
    id: "something-else",
    label: "Something Else",
    content: <h1>Something else - Work in progresss</h1>
  },
];

export default Sections;