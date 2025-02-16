/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Form from '../components/Form';

function Login({ setIsLoggedIn, setUsernameNav }) {
    return <Form route="/api/token/" method="login" setIsLoggedIn={setIsLoggedIn} setUsernameNav={setUsernameNav} />;
}

export default Login;