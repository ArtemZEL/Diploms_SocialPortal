import { useCallback } from "react";
import { Icon, Grid } from "semantic-ui-react";
import { useRouter } from "next/router";
import { logoutUser } from "../../utils/authUser";

const MenuRow = ({ menuName, href, iconName, active = false, children, ...props }) => {
  const router = useRouter();
  const isActive = useCallback(() => {
    return router.pathname === href || active;
  }, [router, active, href]);

  // лучше проигнорировать
  const push = useCallback(e => {
    e.preventDefault();
    router.push(e.currentTarget.href);
  }, [router]);

  const common = { as: "a", onClick: push, href, ...props };

  return (
    <Grid.Row {...common} className={`menuRow ${isActive() ? "active" : ""}`}>
      <Grid.Column>
        {children}
        <Icon name={iconName} size="large" {...(isActive() && { color: "teal" })} />
      </Grid.Column>

      {menuName ? <Grid.Column only="computer">{menuName}</Grid.Column> : <></>}
    </Grid.Row>
  );
};

function SideMenu({ user: { unreadNotification, email, unreadMessage, username ,  unreadNews,unreadNotes } }) {
  const router = useRouter();

  return (
    <div className="stickyCol">
      <Grid>
        <MenuRow href="/" menuName="Главная" iconName="home" />

        <MenuRow only="mobile tablet" iconName="search" href="/search" />

        <MenuRow iconName="mail outline" 
          menuName="Сообщения" 
          href="/messages">
          {unreadMessage ? <div className="menuIconBadge" /> : <></>}
        </MenuRow>

        <MenuRow
          menuName="Уведомления"
          iconName="bell outline"
          href="/notifications"
        >
          {unreadNotification ? <div className="menuIconBadge" /> : <></>}
        </MenuRow>

        <MenuRow
          menuName="Новости"
          iconName="newspaper outline"
          href="/news"
        >
        {unreadNews ? <div className="menuIconBadge" /> : <></>}
        </MenuRow>

        <MenuRow
          menuName="Заметки"
          iconName="sticky note outline"
          href="/notes"
        >
        {unreadNotes ? <div className="menuIconBadge" /> : <></>}
        </MenuRow>

        <MenuRow
          menuName="Профиль"
          iconName="user"
          href={`/${username}`}
          active={router.query.username === username}
        />



        <MenuRow
          menuName="Выйти"
          iconName="log out"
          onClick={() => logoutUser(email)}
        />
      </Grid>
    </div>
  );
}

export default SideMenu;
