import axios from "axios";
import Container from "components/Container";
import { ReactComponent as ArrowIcon } from "assets/images/icons/arrow.svg";
import { useEffect, useState } from "react";

const App = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_API_URL}/users/test`).then(response => {
      setMessage(response?.data?.message);
    });
  }, []);

  return (
    <div>
      <Container>
        <h2>App is working...</h2>
        <p>message: {message}</p>
        <ArrowIcon />
        TEST text
      </Container>
    </div>
  );
};

export default App;
