import React, { useState } from 'react';
import ModalInformation from '../AboutProg';

function ChatExample() {
  const [isModal, setModal] = useState(false);
  const onClose = () => setModal(false);

  return (
    <div>
      <div className='modalW'>
        <button className='modalW-button' onClick={() => setModal(true)}>О чате</button>
      </div>
      <ModalInformation
        visible={isModal}
        title={<h2 style={{textAlign:"center"}}>Чат с другими пользователями</h2>}
        content={
          <div>
            <b><p>Чтобы начать общение с другими пользователями, вам необходимо нажать на поле поиска и ввести имя пользователя, с которым вы хотите связаться. Затем выберите из списка появившегося пользователя, чтобы начать общение с ним.</p></b>
            <img className="modal-image" src="https://res.cloudinary.com/dkk8nrpkj/image/upload/v1685698873/photo_5461092754596680006_x_vgseaz.jpg" />
            <b><p>Нажмите на выбранного пользователя и отправте ему Сообщение</p></b>
            <img className="modal-image" src="https://res.cloudinary.com/dkk8nrpkj/image/upload/v1685699071/photo_5461092754596680009_w_zkouxb.jpg" />
          </div>
        }
        footer={<button className='modal-footer-button' onClick={onClose}>Закрыть</button>}
        onClose={onClose}
      />
    </div>
  );
}

export default ChatExample;
