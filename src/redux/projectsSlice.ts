import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProjectState {
  projects: string[];
  selectedProject: string;
  currentTimer: string;
  startTime: number | null;
  pausedTime: number;
}

const loadProjectsFromLocalStorage = (): string[] => {
  const storedProjects = localStorage.getItem("projects");
  return storedProjects ? JSON.parse(storedProjects) : [];
};

const initialState: ProjectState = {
  projects: loadProjectsFromLocalStorage(),
  selectedProject: localStorage.getItem("currentProject") ?? "",
  currentTimer: localStorage.getItem("currentTimer") ?? "00:00:00",
  startTime: localStorage.getItem("startTime")
    ? Number(localStorage.getItem("startTime"))
    : null,
  pausedTime: localStorage.getItem("pausedTime")
    ? Number(localStorage.getItem("pausedTime"))
    : 0,
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    AddProject: (state, action: PayloadAction<string>) => {
      state.projects.push(action.payload);
      localStorage.setItem("projects", JSON.stringify(state.projects));
    },
    SetSelectedProject: (state, action: PayloadAction<string>) => {
      state.selectedProject = action.payload;
      localStorage.setItem("currentProject", action.payload);
    },
    SetCurrentTimer: (state, action: PayloadAction<string>) => {
      state.currentTimer = action.payload;
      localStorage.setItem("currentTimer", action.payload);
    },
    SetStartTime: (state, action: PayloadAction<number | null>) => {
      state.startTime = action.payload;
      if (action.payload) {
        localStorage.setItem("startTime", action.payload.toString());
      } else {
        localStorage.removeItem("startTime");
      }
    },
    SetPausedTime: (state, action: PayloadAction<number>) => {
      state.pausedTime = action.payload;
      localStorage.setItem("pausedTime", action.payload.toString());
    },
    RemoveCurrentTimer: (state) => {
      state.currentTimer = "00:00:00";
      state.selectedProject = "";
      state.startTime = null;
      state.pausedTime = 0;
      localStorage.removeItem("currentTimer");
      localStorage.removeItem("currentProject");
      localStorage.removeItem("startTime");
      localStorage.removeItem("pausedTime");
    },
  },
});

export const {
  AddProject,
  SetSelectedProject,
  SetCurrentTimer,
  SetStartTime,
  SetPausedTime,
  RemoveCurrentTimer,
} = projectSlice.actions;
export default projectSlice.reducer;
