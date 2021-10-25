import {AppBar, IconButton, Toolbar, Typography, Button, Link} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { spacing } from '@material-ui/system';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    nav:{
        textTransform: "uppercase",
        marginLeft: "5px"
    }
}));

export default function ButtonAppBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            <Link href="/" color="inherit">
                                <a>News</a>
                            </Link>
                        </Typography>
                    <Link href="/notes/new" color={"inherit"} className={classes.nav}>
                        Create note
                    </Link>
                    <Link href="/account/login" color={"inherit"} className={classes.nav} ml={2}>
                        Login
                    </Link>
                    <Link href="/account/signup" color={"inherit"} className={classes.nav} ml={2}>
                        Signup
                    </Link>
                </Toolbar>
            </AppBar>
        </div>
    );
}