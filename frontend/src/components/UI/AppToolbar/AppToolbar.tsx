import {AppBar, Grid, Toolbar, Typography, Box} from "@mui/material";
import ForumIcon from '@mui/icons-material/Forum';
import Nav from 'react-bootstrap/Nav';
import {NavLink, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts"
import {selectUser, systemLogout} from "../../../features/Users/userSlice.ts"

const AppToolbar = () => {
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onLogout = () => {
        dispatch(systemLogout());
        navigate("/");
    }

    return (
        <AppBar position="static" sx={{backgroundColor: "#708090", marginBottom: "50px"}}>
            <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
                <Grid>
                    <Typography variant="h6">
                        <NavLink style={{color: "white", textDecoration: "none"}} to="/">
                            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                <ForumIcon sx={{
                                    display: "block",
                                    marginRight: "10px",
                                    fontSize: "30px",
                                }}/>
                                <span className="d-block">Forum</span>
                            </div>
                        </NavLink>
                    </Typography>
                </Grid>
                <Grid>
                    {
                        user ? <Box display="flex" alignItems="center">
                                <span className="d-block me-3">Hello, <b>{user.username}!</b></span>
                                <NavLink
                                    className="nav-item text-white"
                                    to="/add-new-post"
                                >Add new post</NavLink>
                                <span className="mx-2">or</span>
                                <NavLink
                                    className="nav-item text-white"
                                    to="/"
                                    onClick={onLogout}
                                >Logout</NavLink>
                            </Box>
                            :
                            <Nav>
                                <NavLink
                                    className="nav-item text-white"
                                    to="/registration"
                                >Registration</NavLink>
                                <span className="mx-2">or</span>
                                <NavLink
                                    className="nav-item text-white"
                                    to="/login"
                                >Login</NavLink>
                            </Nav>

                    }
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default AppToolbar;