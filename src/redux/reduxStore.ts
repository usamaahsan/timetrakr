import { configureStore } from "@reduxjs/toolkit";
import projectsSlice from "./projectsSlice";
import recentProjectsSlice from "./recentProjectsSlice";

export const reduxStore = configureStore({
  reducer: {
    projects: projectsSlice,
    recentProjects: recentProjectsSlice
  },
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
