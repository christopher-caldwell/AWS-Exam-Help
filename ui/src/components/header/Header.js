import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import NavLink from "./NavLink";
import routes from "../../router/routes";
import "../../css/Header.css";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex"
	},
	drawer: {
		[theme.breakpoints.up("md")]: {
			flexShrink: 0,
			width: drawerWidth
		}
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up("md")]: {
			display: "none"
		}
	},
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3)
	}
}));

export default function ResponsiveDrawer({
	container,
	setThemeMode,
	persistedMode
}) {
	const [modeChecked, setModeChecked] = useState(false);
	console.log("persistedMode", persistedMode);
	const handleChange = event => {
		setModeChecked(event.target.checked);
		setThemeMode(event.target.checked ? "dark" : "light");
		window.localStorage.setItem(
			"persistedMode",
			JSON.stringify(event.target.checked ? "dark" : "light")
		);
	};
	useEffect(() => {
		const preselectedMode = persistedMode && persistedMode === "dark";
		setModeChecked(preselectedMode);
	}, [persistedMode]);

	const classes = useStyles();
	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = useState(false);

	function handleDrawerToggle() {
		console.log("handleDrawer: ", mobileOpen);
		setMobileOpen(!mobileOpen);
	}

	const drawer = (
		<div>
			<div className={classes.toolbar} />
			<div className="theme-selector-cont">
				<div />
				<div>
					<FormGroup row>
						<FormControlLabel
							control={
								<Switch
									checked={modeChecked}
									onChange={handleChange}
									value="true"
								/>
							}
							label="Dark Mode"
						/>
					</FormGroup>
				</div>
			</div>
			<Divider />
			<List>
				{routes.map((route, index) => (
					<NavLink {...route} drawerToggle={handleDrawerToggle} key={index} />
				))}
			</List>
		</div>
	);

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="Open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						className={classes.menuButton}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap>
						AWS Exam Tips
					</Typography>
				</Toolbar>
			</AppBar>
			<nav className={classes.drawer} aria-label="Mailbox folders">
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Hidden smUp implementation="css">
					<Drawer
						container={container}
						variant="temporary"
						anchor={theme.direction === "rtl" ? "right" : "left"}
						open={mobileOpen}
						onClose={handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper
						}}
					>
						{drawer}
					</Drawer>
				</Hidden>
				<Hidden smDown implementation="css">
					<Drawer
						classes={{
							paper: classes.drawerPaper
						}}
						variant="permanent"
						open
					>
						{drawer}
					</Drawer>
				</Hidden>
			</nav>
		</div>
	);
}
