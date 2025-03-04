import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface RecentProjectInterface{
    id?:string;
    project:string;
    timeElapsed:string;
}

interface RecentProjectsState{
    projects: RecentProjectInterface[];
}


const getRecentProjectsFromStorage = () => {
    const storedData = localStorage.getItem("recentProjects");
  return storedData ? JSON.parse(storedData) : [];
}

const initialState : RecentProjectsState = {
    projects: getRecentProjectsFromStorage()
}

const recentProjectsSlice = createSlice({
    name:'recentProjects',
    initialState,
    reducers:{
        AddRecentProject:(state, action:PayloadAction<RecentProjectInterface>)=>{
            const project = {
                ...action.payload,
                id:new Date().toISOString()
            }
            state.projects.push(project);
            localStorage.setItem("recentProjects", JSON.stringify(state.projects));
        },
        DeleteRecentProject:(state, action:PayloadAction<string>)=>{
            const projects = state.projects.filter((value, _)=> value.id !== action.payload);
            state.projects = projects;
            localStorage.setItem("recentProjects", JSON.stringify(state.projects));
        }
    }
});

export const {AddRecentProject, DeleteRecentProject} = recentProjectsSlice.actions;
export default recentProjectsSlice.reducer;