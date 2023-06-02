import { Icon, Message, Divider } from "semantic-ui-react";
import { useRouter } from "next/router";
import Link from "next/link";

export const HeaderMessage = () => {
  const router = useRouter();
  const signupRoute = router.pathname === "/signup";

  return (
    <Message
      color="teal"
      attached
      header={signupRoute ? "Создайте свой аккаунт" : "Добро пожаловать"}
      icon={signupRoute ? "settings" : "privacy"}
      content={signupRoute ? "Зарегистрируйтесь и вливайтесь в команду" : "Что бы войти в портал введите вашу почту и пароль"}
    />
  );
};

export const FooterMessage = () => {
  const router = useRouter();
  const signupRoute = router.pathname === "/signup";

  return (
    <>
      {signupRoute ? (
        <>
          <Message attached="bottom" warning>
            <Icon name="help" />
            Уже есть аккаунт? <Link href="/login">Перейти сюда</Link>
          </Message>
          <Divider hidden />
        </>
      ) : (
        <>
          <Message attached="bottom" info>
            <Icon name="lock" />
            <Link href="/reset">Забыли пароль?</Link>
          </Message>

          <Message attached="bottom" warning>
            <Icon name="help" />
            Новый сотрудник? <Link href="/signup">Зарегистрируйтесь</Link> 
          </Message>
        </>
      )}
    </>
  );
};
