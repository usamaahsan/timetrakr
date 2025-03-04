import { Box } from "@mui/material";
import { Appbar } from "./components/appbar/appbar";
import { Tracker } from "./components/tracker/tracker";
import { RecentProjects } from "./components/recent-projects/recent-projects";

function App() {
  return (
    <Box display="flex" height="100vh" flexDirection="column" gap={1}>
      <Appbar />
      <Tracker />
      <RecentProjects />
    </Box>
  );
}

export default App;
