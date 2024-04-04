import classes from "./Layout.module.scss";

const Layout: React.FC<{ children: React.ReactNode }> = (props) => (
  <div className={classes.content}>{props.children}</div>
);

export default Layout;
