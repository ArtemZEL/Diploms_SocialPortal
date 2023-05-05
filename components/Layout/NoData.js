import { Message, Button } from "semantic-ui-react";

export const NoProfilePosts = () => (
  <>
    <Message info icon="meh" header="Простите" content="Пользователь еще ничего не опубликовал!" />
    <Button icon="long arrow alternate left" content="Назад" as="a" href="/" />
  </>
);

export const NoFollowData = ({ followersComponent, followingComponent }) => (
  <>
    {followersComponent && (
      <Message icon="user outline" info content={`User does not have followers`} />
    )}

    {followingComponent && (
      <Message icon="user outline" info content={`User does not follow any users`} />
    )}
  </>
);

export const NoMessages = () => (
  <Message
    info
    icon="telegram plane"
    header="Простите"
    content="Вы еще никому не писали. Чтобы написать кому-нибудь, нажмите на поиск и поищите пользователя для общения!"
  />
);

export const NoPosts = () => (
  <Message
    info
    icon="meh"
    header="Хей!"
    content="Нет сообщний убедитесь что вы добавили кого нибудб в друзья"
  />
);

export const NoProfile = () => (
  <Message info icon="meh" header="Хей!" content="Пользователь не найден." />
);

export const NoNotifications = () => (
  <Message content="Нет уведомлений" icon="smile" info />
);

export const NoPostFound = () => (
  <Message info icon="meh" header="Хей!" content="Нету никаких еще постов" />
);
