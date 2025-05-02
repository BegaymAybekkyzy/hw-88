import {Route, Routes} from "react-router-dom";
import {Container, Typography} from "@mui/material";
import PostList from "./features/Posts/PostList.tsx";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar.tsx";
import Registration from "./features/Users/Registration.tsx";
import Authentication from "./features/Users/Authentication.tsx";
import PostDetail from "./features/Posts/PostDetail.tsx";
import AddPost from "./features/Posts/components/AddPost.tsx";
import ProtectedRoute from "./components/UI/ProtectedRoute/ProtectedRoute.tsx";
import {useAppSelector} from "./app/hooks.ts";
import {selectUser} from "./features/Users/userSlice.ts";

const App = () => {
    const user = useAppSelector(selectUser);

    return (
        <>
            <header>
                <AppToolbar />
            </header>
            <Container>
                <Routes>
                    <Route path="/" element={<PostList/>}></Route>
                    <Route path="/registration" element={<Registration/>} />
                    <Route path="/login" element={<Authentication/>} />
                    <Route path="/add-new-post" element={
                        <ProtectedRoute isAllowed={Boolean(user)}><AddPost/></ProtectedRoute>
                    } />
                    <Route path="/post/:id" element={<PostDetail/>} />
                    <Route path="*" element={<Typography variant={"h2"}>Page not found</Typography>}></Route>
                </Routes>
            </Container>
        </>
    )
};

export default App
