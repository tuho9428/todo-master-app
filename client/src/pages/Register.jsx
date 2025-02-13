import AuthForm from "../components/Auth/AuthForm";

const Register = () => {
  return (
    <AuthForm
      title="Register"
      linkText="Login"
      linkPath="/login"
      linkDescription="Already have an account?"
    />
  );
};

export default Register;
