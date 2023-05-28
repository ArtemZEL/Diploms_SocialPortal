import React, { useState } from 'react';
import ModalInformation from '../AboutProg';

function ChatExample() {
  const [isModal, setModal] = useState(false);
  const onClose = () => setModal(false);

  return (
    <div>
      <div className='modalW'>
        <button onClick={() => setModal(true)}>Создание поста</button>
      </div>
      <ModalInformation
        visible={isModal}
        title={<h2 style={{textAlign:"center"}}>Создание поста</h2>}
        content={
          <div>
            <p>Содержимое модального окна</p>
            <img className="modal-image" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvjoy.cc%2Fwp-content%2Fuploads%2F2019%2F07%2F13-1.jpg&f=1&nofb=1&ipt=3d39202427c8c366104b2eaba29eb6129f34e8c43907ba31476787339ddfb22b&ipo=images" alt="Описание изображения" />
          </div>
        }
        footer={<button onClick={onClose}>Закрыть</button>}
        onClose={onClose}
      />
    </div>
  );
}

export default ChatExample;