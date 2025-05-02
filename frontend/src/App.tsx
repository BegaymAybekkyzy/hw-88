import {Route, Routes} from "react-router-dom";
import {Container, Typography} from "@mui/material";
import PostList from "./features/Posts/PostList.tsx";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar.tsx";
import Registration from "./features/Users/Registration.tsx";
import Authentication from "./features/Users/Authentication.tsx";

const App = () => {

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
                    <Route path="*" element={<Typography variant={"h2"}>Page not found</Typography>}></Route>
                </Routes>
            </Container>
        </>
    )
};

export default App
