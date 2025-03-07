import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const API_URL = "http://localhost:3000"; //https://jsonplaceholder.typicode.com/users

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    const response = await axios.get(`${API_URL}/userList`);
    return response.data;
})

export const addUser = createAsyncThunk("users/addUser", async (data) => {
    const response = await axios.post(`${API_URL}/Addusers`, data);
    return response.data;
});

export const updateUser = createAsyncThunk("users/updateUser", async (user) => {
    const response = await axios.put(`${API_URL}/updateUsers/${user.id}`, user);
    console.log('response: ', response);
    return response.data.result;
});

export const deleteUser = createAsyncThunk("users/DeletUsers", async (userId) => {
    await axios.delete(`${API_URL}/DeletUsers/${userId}`);
    return userId;
})

const usersSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        status: "idle",
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            // Add User
            .addCase(addUser.fulfilled, (state, action) => {
                state.users.push(action.payload)
            })
            // Update User
            .addCase(updateUser.fulfilled, (state, action) => {
                const index = state.users.findIndex((user) => user.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload
                }
            })
            // Delete User
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter(user => user.id !== action.payload);
            })
    }

});

export default usersSlice.reducer;