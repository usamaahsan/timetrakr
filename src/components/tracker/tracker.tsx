import { Box, Button, IconButton, Typography } from "@mui/material";
import { ProjectSelector } from "../project-selector/project-selector";
import { Pause, PlayArrow, Stop } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reduxStore";
import { useEffect, useState } from "react";
import {
  SetCurrentTimer,
  RemoveCurrentTimer,
  SetStartTime,
  SetPausedTime,
} from "../../redux/projectsSlice";
import { AddRecentProject } from "../../redux/recentProjectsSlice";

export const Tracker = () => {
  const { selectedProject, currentTimer, startTime, pausedTime } = useSelector(
    (state: RootState) => state.projects
  );
  const dispatch = useDispatch();
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        if (startTime) {
          const elapsedSeconds =
            Math.floor((Date.now() - startTime) / 1000) + pausedTime;
          const newTime = new Date(elapsedSeconds * 1000)
            .toISOString()
            .substring(11, 19);

          dispatch(SetCurrentTimer(newTime));
        }
      }, 1000);
    }

    const handleVisibilityChange = () => {
      if (!document.hidden && isRunning && startTime !== null) {
        const elapsedSeconds =
          Math.floor((Date.now() - startTime) / 1000) + pausedTime;
        const newTime = new Date(elapsedSeconds * 1000)
          .toISOString()
          .substring(11, 19);
        dispatch(SetCurrentTimer(newTime));
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (interval) clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isRunning, startTime, pausedTime, dispatch]);

  const startTimer = () => {
    setIsRunning(true);
    if (!startTime) {
      dispatch(SetStartTime(Date.now()));
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);
    if (startTime) {
      const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
      dispatch(SetPausedTime(pausedTime + elapsedSeconds));
      dispatch(SetStartTime(null));
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    dispatch(SetCurrentTimer("00:00:00"));
    dispatch(SetStartTime(null));
    dispatch(SetPausedTime(0));
  };

  const endTimer = () => {
    setIsRunning(false);
    dispatch(RemoveCurrentTimer());
    dispatch(
      AddRecentProject({
        project: selectedProject,
        timeElapsed: currentTimer,
      })
    );
  };

  return (
    <Box
      p={2}
      display="flex"
      alignItems="center"
      flexDirection="column"
      gap={1}
    >
      <ProjectSelector />
      <Typography variant="h1" mt={2} textAlign="center">
        {currentTimer || "00:00:00"}
      </Typography>

      {selectedProject && (
        <>
          <Typography variant="body2" textAlign="center">
            Time tracked for this project
          </Typography>
          <Box
            mt={4}
            display="flex"
            justifyContent="center"
            gap={1}
            alignItems="center"
          >
            {!isRunning ? (
              <IconButton
                onClick={startTimer}
                size="large"
                sx={{ width: 64, height: 64, "& svg": { fontSize: 32 } }}
              >
                <PlayArrow />
              </IconButton>
            ) : (
              <>
                <Button variant="outlined" onClick={resetTimer}>
                  Reset
                </Button>
                <IconButton
                  onClick={pauseTimer}
                  size="large"
                  sx={{ width: 64, height: 64, "& svg": { fontSize: 32 } }}
                >
                  <Pause />
                </IconButton>
                <IconButton
                  onClick={endTimer}
                  sx={{
                    backgroundColor: "transparent",
                    border: (theme) =>
                      `1px solid ${theme.palette.secondary.main}`,
                  }}
                >
                  <Stop />
                </IconButton>
              </>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};
