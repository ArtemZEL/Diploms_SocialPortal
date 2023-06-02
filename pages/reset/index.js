import React, { useEffect, useState } from "react";
import { Form, Button, Message, Segment } from "semantic-ui-react";
import baseUrl from "../../utils/baseUrl";
import catchErrors from "../../utils/catchErrors";
import axios from "axios";

function ResetPage() {
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);

  const [emailChecked, setEmailChecked] = useState(false);

  const [loading, setLoading] = useState(false);

  const resetPassword = async e => {
    e.preventDefault();

    setLoading(true);

    try {
      await axios.post(`${baseUrl}/api/reset`, { email });

      setEmailChecked(true);
    } catch (error) {
      setErrorMsg(catchErrors(error));
    }

    setLoading(false);
  };

  useEffect(() => {
    errorMsg !== null && setTimeout(() => setErrorMsg(null), 5000);
  }, [errorMsg]);

  return (
    <>
      {emailChecked ? (
        <Message
          attached
          icon="mail"
          header="Check Your Inbox"
          content="Пожалуйста, проверьте свой почтовый ящик для получения дальнейших инструкций"
          success
        />
      ) : (
        <Message attached icon="settings" header="Reset Password" color="teal" />
      )}

      <Form loading={loading} onSubmit={resetPassword} error={errorMsg !== null}>
        <Message error header="Oops!" content={errorMsg} />

        <Segment>
          <Form.Input
            fluid
            icon="mail outline"
            type="email"
            iconPosition="left"
            label="Почта"
            placeholder="Введите адрес электронной почты"
            name="email"
            onChange={e => setEmail(e.target.value)}
            value={email}
            required
          />

          <Button
            disabled={loading || email.length === 0}
            icon="configure"
            type="submit"
            color="orange"
            content="Отправить"
          />
        </Segment>
      </Form>
    </>
  );
}

export default ResetPage;
