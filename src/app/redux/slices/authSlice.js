import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, register } from "../../services/auth.service";


// Async Thunks
export const authLogin = createAsyncThunk("auth/login", async (data, { rejectWithValue }) => {
    try {
        return await login(data);
    } catch (error) {
        return rejectWithValue(error);
    }
});


export const authregister = createAsyncThunk("auth", async (data,{rejectWithValue}) => {  //rejectWithValue -- > errors are properly handled in the Redux state.
    try {
        return await register(data)
    }
    catch (error) {
        return rejectWithValue(error);
    }
})

// export const authLogin = createAsyncThunk("auth/login", async (data) => {
//     try {
//         const response = await axios.post(`${config.API_URL}auth/login`, data);
//         return response.data;
//     }
//     catch (error) {
//         if (error.response && error.response.data) {
//             return error.response.data;
//         }
//     }
// })


const authSlice = createSlice({
    name: "authentication",
    initialState: {
        result: [],
        status: "idle",
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(authregister.pending, (state) => {
                state.status = 'Loading'
            })
            .addCase(authregister.fulfilled, (state, action) => {
                state.status = "Succeeded";
                state.result = action.payload
            })
            .addCase(authregister.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            // Login
            .addCase(authLogin.pending, (state) => {
                state.status = 'Loading'
            })
            .addCase(authLogin.fulfilled, (state, action) => {
                state.status = "Succeeded";
                state.result = action.payload;
            })
            .addCase(authLogin.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload?.message
            })

    }
})

export default authSlice.reducer;