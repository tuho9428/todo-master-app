import AuthForm from "../components/Auth/AuthForm";

const Login = () => {
  return (
    <AuthForm
      title="Login"
      linkText="Register"
      linkPath="/register"
      linkDescription="Don't have an account?"
    />
  );
};

export default Login;
