import React, { useState } from "react";
import { Form, Modal, Segment, List, Icon } from "semantic-ui-react";
import Link from "next/link";
import calculateTime from "../../utils/calculateTime";
import styles from "../Messages/listMessages.module.css";

const { bubbleWrapper, inlineContainer, inlineIcon, otherBubble, other } = styles;

function MessageNotificationModal({
  socket,
  showNewMessageModal,
  newMessageModal,
  newMessageReceived,
  user
}) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const onModalClose = () => showNewMessageModal(false);

  const formSubmit = e => {
    e.preventDefault();

    if (socket.current) {
      socket.current.emit("sendMsgFromNotification", {
        userId: user._id,
        msgSendToUserId: newMessageReceived.sender,
        msg: text
      });

      socket.current.on("msgSentFromNotification", () => {
        showNewMessageModal(false);
      });
    }
  };

  return (
    <>
      <Modal
        size="small"
        open={newMessageModal}
        onClose={onModalClose}
        closeIcon
        closeOnDimmerClick
      >
        <Modal.Header content={`New Message from ${newMessageReceived.senderName}`} />

        <Modal.Content>
          <div className={bubbleWrapper}>
            <div className={inlineContainer}>
              <img className={inlineIcon} src={newMessageReceived.senderProfilePic} />
            </div>

            <div className={`${otherBubble} ${other}`}>{newMessageReceived.msg}</div>

            <span className={other}>{calculateTime(newMessageReceived.date)}</span>
          </div>

          <div style={{ position: "sticky", bottom: "0px" }}>
            <Segment secondary color="teal" attached="bottom">
              <Form reply onSubmit={formSubmit}>
                <Form.Input
                  size="large"
                  placeholder="Send New Message"
                  value={text}
                  onChange={e => setText(e.target.value)}
                  action={{
                    color: "blue",
                    icon: "telegram plane",
                    disabled: text === "",
                    loading: loading
                  }}
                />
              </Form>
            </Segment>
          </div>

          <div style={{ marginTop: "5px" }}>
            <Link href={`/messages?message=${newMessageReceived.sender}`}>
              View All Messages
            </Link>

            <br />

            <Instructions username={user.username} />
          </div>
        </Modal.Content>
      </Modal>
    </>
  );
}

const Instructions = ({ username }) => (
  <List>
    <List.Item>
      <Icon name="help" />
      <List.Content>
        <List.Header>
          Если вам не нравится, что всплывающее окно появляется при получении нового сообщения:
        </List.Header>
      </List.Content>
    </List.Item>

    <List.Item>
      <Icon name="hand point right" />
      <List.Content>
        Вы можете отключить его, перейдя в
        <Link href={`/${username}`}></Link>
        на вашу страницу и щелкнув на вкладку «Настройки».
      </List.Content>
    </List.Item>

    <List.Item>
      <Icon name="hand point right" />
      Внутри меню есть настройка под названием: Показать всплывающее окно нового сообщения?
    </List.Item>

    <List.Item>
      <Icon name="hand point right" />
      Просто переключите в настройках, чтобы отключить/включить всплывающее окно сообщения.
    </List.Item>
  </List>
);

export default MessageNotificationModal;
