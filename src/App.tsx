import Layout from "./components/Layout/Layout";
import "./i18n/config";
import LoginForm from "./components/LoginForm/LoginForm";
import LoginHead from "./components/LoginHead/LoginHead";

const App = () => (
  <Layout>
    <LoginHead />
    <LoginForm />
  </Layout>
);

export default App;
