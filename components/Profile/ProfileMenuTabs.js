import React from "react";
import { Menu } from "semantic-ui-react";

function ProfileMenuTabs({
  activeItem,
  handleItemClick,
  followersLength,
  followingLength,
  ownAccount,
  loggedUserFollowStats
}) {
  return (
    <>
      <Menu pointing secondary>
        <Menu.Item
          name="Профиль"
          active={activeItem === "profile"}
          onClick={() => handleItemClick("profile")}
        />

        <Menu.Item
          name={`${followersLength} подписчики`}
          active={activeItem === "followers"}
          onClick={() => handleItemClick("followers")}
        />

        {ownAccount ? (
          <>
            <Menu.Item
              name={`${
                loggedUserFollowStats.following.length > 0
                  ? loggedUserFollowStats.following.length
                  : 0
              } В друзьях`}
              active={activeItem === "following"}
              onClick={() => handleItemClick("following")}
            />

            <Menu.Item
              name="Обновить профиль"
              active={activeItem === "updateProfile"}
              onClick={() => handleItemClick("updateProfile")}
            />

            <Menu.Item
              name="Настройки"
              active={activeItem === "settings"}
              onClick={() => handleItemClick("settings")}
            />
          </>
        ) : (
          <Menu.Item
            name={`${followingLength} подписан`}
            active={activeItem === "following"}
            onClick={() => handleItemClick("following")}
          />
        )}
      </Menu>
    </>
  );
}

export default ProfileMenuTabs;
