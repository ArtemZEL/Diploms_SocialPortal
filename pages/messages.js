import { useEffect, useRef, useState, useCallback } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import { Segment, Header, Divider, Comment, Grid } from "semantic-ui-react";
import Chat from "../components/Chats/Chat";
import ChatListSearch from "../components/Chats/ChatListSearch";
import { NoMessages } from "../components/Layout/NoData";
import Banner from "../components/Messages/Banner";
import MessageInputField from "../components/Messages/MessageInputField";
import Message from "../components/Messages/Message";
import getUserInfo from "../utils/getUserInfo";
import newMsgSound from "../utils/newMsgSound";
import cookie from "js-cookie";

const setMessageToUnread = () => {
  axios.post(
    `${baseUrl}/api/chats`,
    {},
    { headers: { Authorization: cookie.get("token") } }
  );
};

function Messages({ chatsData = [], user }) {
  const [chats, setChats] = useState(chatsData);
  const router = useRouter();

  const socket = useRef();
  const [connectedUsers, setConnectedUsers] = useState([]);

  const [messages, setMessages] = useState([]);
  const [bannerData, setBannerData] = useState({ name: "", profilePicUrl: "" });

  const divRef = useRef();
  const scrollDivToBottom = useCallback(() => {
    if (divRef.current) divRef.current.scrollTop = divRef.current.scrollHeight;
  }, []);

  // ссылка предназначена для сохранения состояния строки запроса в URL-адресе при повторном рендеринге. Эта ссылка является значением строки запроса внутри URL-адреса.
  const openChatId = useRef("");

  //Соединение useEffect
  useEffect(() => {
    if (user.unreadMessage) setMessageToUnread();

    if (!socket.current) {
      socket.current = io(baseUrl);
    }

    if (socket.current) {
      socket.current.emit("join", { userId: user._id });

      socket.current.on("connectedUsers", ({ users }) => {
        users.length > 0 && setConnectedUsers(users);
      });

      if (chats.length > 0 && !router.query.message) {
        router.push(`/messages?message=${chats[0].messagesWith}`, undefined, {
          shallow: true
        });
      }
    }
  }, []);

  // загрузка сообщений useEffect
  useEffect(() => {
    const loadMessages = () => {
      socket.current.emit("loadMessages", {
        userId: user._id,
        messagesWith: router.query.message
      });

      socket.current.on("messagesLoaded", async ({ chat }) => {
        setMessages(chat.messages);
        setBannerData({
          name: chat.messagesWith.name,
          profilePicUrl: chat.messagesWith.profilePicUrl
        });

        openChatId.current = chat.messagesWith._id;
        divRef.current && scrollDivToBottom(divRef);
      });

      socket.current.on("noChatFound", async () => {
        const { name, profilePicUrl } = await getUserInfo(router.query.message);

        setBannerData({ name, profilePicUrl });
        setMessages([]);

        openChatId.current = router.query.message;
      });
    };

    if (socket.current && router.query.message) loadMessages();
  }, [router.query.message]);

  const sendMsg = msg => {
    if (socket.current) {
      socket.current.emit("sendNewMsg", {
        userId: user._id,
        msgSendToUserId: openChatId.current,
        msg
      });
    }
  };

  // подтверждение отправки сообщения и получение сообщения useEffect
  useEffect(() => {
    const msgSent = ({ newMsg }) => {
      if (newMsg.receiver === openChatId.current) {
        setMessages(prev => [...prev, newMsg]);

        setChats(prev => {
          const previousChat = prev.find(
            chat => chat.messagesWith === newMsg.receiver
          );
          previousChat.lastMessage = newMsg.msg;
          previousChat.date = newMsg.date;

          return [...prev];
        });
      }
    };

    const newMsgReceived = async ({ newMsg }) => {
      let senderName;

      // КОГДА ЧАТ С ОТПРАВИТЕЛЕМ В НАСТОЯЩЕЕ ВРЕМЯ ОТКРЫТ В ВАШЕМ БРАУЗЕРЕ
      if (newMsg.sender === openChatId.current) {
        setMessages(prev => [...prev, newMsg]);

        setChats(prev => {
          const previousChat = prev.find(chat => chat.messagesWith === newMsg.sender);
          previousChat.lastMessage = newMsg.msg;
          previousChat.date = newMsg.date;

          senderName = previousChat.name;

          return [...prev];
        });
      }
      // ПРОВЕРКА, ЕСЛИ ЧАТ ПРИСУТСТВУЕТ, ИЛИ СОЗДАЙТЕ НОВЫЙ ЧАТ
      else {
        const prevIndex = chats.findIndex(chat => chat.messagesWith === newMsg.sender);

        if (prevIndex !== -1) {
          const newChat = {
            ...chats[prevIndex],
            lastMessage: newMsg.msg,
            date: newMsg.date
          };
          senderName = newChat.name;

          return setChats(prev => [
            newChat,
            ...prev.filter(chat => chat.messagesWith !== newMsg.sender)
          ]);
        } else {
          const { name, profilePicUrl } = await getUserInfo(newMsg.sender);
          senderName = name;

          const newChat = {
            messagesWith: newMsg.sender,
            name,
            profilePicUrl,
            lastMessage: newMsg.msg,
            date: newMsg.date
          };

          return setChats(prev => [newChat, ...prev]);
        }
      }

      newMsgSound(senderName);
    };

    socket.current?.on("msgSent", msgSent);
    socket.current?.on("newMsgReceived", newMsgReceived);

    return () => {
      socket.current?.off("msgSent", msgSent);
      socket.current?.off("newMsgReceived", newMsgReceived);
    };
  }, [chats]);

  useEffect(() => {
    messages.length > 0 && scrollDivToBottom(divRef);
  }, [messages]);

  const deleteMsg = messageId => {
    if (socket.current) {
      socket.current.emit("deleteMsg", {
        userId: user._id,
        messagesWith: openChatId.current,
        messageId
      });

      socket.current.on("msgDeleted", () => {
        setMessages(prev => prev.filter(message => message._id !== messageId));
      });
    }
  };

  const deleteChat = async messagesWith => {
    try {
      await axios.delete(`${baseUrl}/api/chats/${messagesWith}`, {
        headers: { Authorization: cookie.get("token") }
      });

      setChats(prev => prev.filter(chat => chat.messagesWith !== messagesWith));
      router.push("/messages", undefined, { shallow: true });
      openChatId.current = "";
    } catch (error) {
      alert("Error deleting chat");
    }
  };

  return (
    <>
      <Segment padded basic size="large" style={{ marginTop: "5px" }}>
        <Header
          icon="home"
          content="На главную!"
          onClick={() => router.push("/")}
          style={{ cursor: "pointer" }}
        />
        <Divider hidden />

        <div style={{ marginBottom: "10px" }}>
          <ChatListSearch chats={chats} setChats={setChats} />
        </div>

        {chats.length > 0 ? (
          <>
            <Grid stackable>
              <Grid.Column width={4}>
                <Comment.Group size="big">
                  <Segment raised style={{ overflow: "auto", maxHeight: "32rem" }}>
                    {chats.map(chat => (
                      <Chat
                        key={chat.messagesWith}
                        chat={chat}
                        connectedUsers={connectedUsers}
                        deleteChat={deleteChat}
                      />
                    ))}
                  </Segment>
                </Comment.Group>
              </Grid.Column>

              <Grid.Column width={12}>
                {router.query.message && (
                  <>
                    <div
                      style={{
                        overflow: "auto",
                        overflowX: "hidden",
                        maxHeight: "35rem",
                        height: "35rem",
                        backgroundColor: "whitesmoke"
                      }}
                      ref={divRef}
                    >
                      <div style={{ position: "sticky", top: "0" }}>
                        <Banner bannerData={bannerData} />
                      </div>

                      {messages.map(message => (
                        <Message
                          key={message._id}
                          bannerProfilePic={bannerData.profilePicUrl}
                          message={message}
                          user={user}
                          deleteMsg={deleteMsg}
                        />
                      ))}
                    </div>

                    <MessageInputField sendMsg={sendMsg} />
                  </>
                )}
              </Grid.Column>
            </Grid>
          </>
        ) : (
          <NoMessages />
        )}
      </Segment>
    </>
  );
}
export const getServerSideProps = async ctx => {
  try {
    const { token } = parseCookies(ctx);

    const res = await axios.get(`${baseUrl}/api/chats`, {
      headers: { Authorization: token }
    });

    return { props: { chatsData: res.data } };
  } catch (error) {
    return { props: { errorLoading: true } };
  }
};

export default Messages;
