import { useCallback } from "react";
import { Menu, Icon, Dropdown } from "semantic-ui-react";
import { useRouter } from "next/router";
import { logoutUser } from "../../utils/authUser";

function MobileHeader({ user }) {
  const { unreadNotification, email, unreadMessage, unreadNews, username, unreadNotes, underAbout,underRepost} = user;
  const router = useRouter();

  const isActive = useCallback(route => router.pathname === route, [router]);
  // prettier-ignore
  const push = useCallback(e => {
    e.preventDefault();
    router.push(e.currentTarget.href);
  }, [router]);

  const common = (menuItem = true) => ({
    as: "a",
    onClick: push,
    ...(menuItem && { header: true })
  });

  return (
    <Menu fluid borderless widths={4}>
      <Menu.Item {...common()} href="/" active={isActive("/")}>
        <Icon name="home" size="large" />
      </Menu.Item>

      <Menu.Item
        {...common()}
        href="/messages"
        active={isActive("/messages") || unreadMessage}
      >
        <div style={{ position: "relative" }}>
          {unreadMessage && <div className="menuIconBadge mobile" />}

          <Icon name="mail outline" size="large" />
        </div>
      </Menu.Item>

      <Menu.Item
        {...common()}
        href="/notifications"
        active={isActive("/notifications") || unreadNotification}
      >
        <div style={{ position: "relative" }}>
          {unreadNotification && <div className="menuIconBadge mobile" />}

          <Icon name="bell outline" size="large" />
        </div>
      </Menu.Item>

    {/* Гамбурнер меню*/}
      <Dropdown item icon="bars" direction="left">
        <Dropdown.Menu>
          <Dropdown.Item
            {...common(false)}
            href="/news"
            active={isActive("/news") || unreadNews}
          >
            <Icon name="newspaper outline" size="large" />
            Новости
          </Dropdown.Item>

          <Dropdown.Item
            {...common(false)}
            href="/notes"
            active={isActive("/notes") || unreadNotes}
          >
            <Icon name="sticky note outline" size="large" />
            Заметки
          </Dropdown.Item>

          <Dropdown.Item
            {...common(false)}
            href="/repost"
            active={isActive("/repost") || underRepost}
          >
            <Icon name="sticky note outline" size="large" />
            Заметки
          </Dropdown.Item>

          <Dropdown.Item
            {...common(false)}
            href="/about"
            active={isActive("/about") || underAbout}
          >
            <Icon name="question circle outline" size="large" />
            Информация
          </Dropdown.Item>

          <Dropdown.Item
            {...common(false)}
            href={`/${username}`}
            active={isActive(`/${username}`)}
          >
            <Icon name="user" size="large" />
            Профиль
          </Dropdown.Item>

          <Dropdown.Item
            {...common(false)}
            href="/search"
            active={isActive("/search")}
          >
            <Icon name="search" size="large" />
            Поиск
          </Dropdown.Item>

          <Dropdown.Item onClick={() => logoutUser(email)}>
            <Icon name="sign out alternate" size="large" />
            Выйти
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Menu>
  );
}

export default MobileHeader;
