import { Box, IconButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reduxStore";
import { Delete } from "@mui/icons-material";
import { DeleteRecentProject } from "../../redux/recentProjectsSlice";
import { useEffect, useState } from "react";

export const RecentProjects = () => {
  const { projects } = useSelector((state: RootState) => state.recentProjects);
  const [totalTimeElapsed, setTotalTimeElapsed] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const calculateTotal = () => {
      let totalSeconds = 0;

      projects.forEach(({ timeElapsed }) => {
        const [hh, mm, ss] = timeElapsed.split(":").map(Number);
        totalSeconds += hh * 3600 + mm * 60 + ss;
      });

      // Convert totalSeconds back to HH:MM:SS
      const hours = Math.floor(totalSeconds / 3600)
        .toString()
        .padStart(2, "0");
      const minutes = Math.floor((totalSeconds % 3600) / 60)
        .toString()
        .padStart(2, "0");
      const seconds = (totalSeconds % 60).toString().padStart(2, "0");
      setTotalTimeElapsed(`${hours}:${minutes}:${seconds}`);
    };

    calculateTotal();
  }, [projects]);

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h6" mb={1}>
          Recent Projects: {projects.length}
        </Typography>
        <Typography variant="body2">Total: {totalTimeElapsed}</Typography>
      </Box>
      {projects.map((project, index) => (
        <Box
          key={`recent${project}${index}`}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={1}
          mb={1}
          sx={{
            backgroundColor: (theme) => theme.palette.secondary.main,
            borderRadius: "12px",
          }}
        >
          <Typography>{project.project}</Typography>
          <Box display="flex" gap={1} alignItems="center">
            <Typography>{project.timeElapsed}</Typography>
            <IconButton
              onClick={() => dispatch(DeleteRecentProject(project.id ?? ""))}
            >
              <Delete />
            </IconButton>
          </Box>
        </Box>
      ))}
    </Box>
  );
};
