import React, { useState } from 'react';
import ModalInformation from '../AboutProg';
function ChatExample() {
  const [isModal, setModal] = useState(false);
  const onClose = () => setModal(false);

  return (
    <div>
     <div className='modalW'>
      <button  onClick={() => setModal(true)}>О чате</button>
     </div>
      <ModalInformation
        visible={isModal}
        title={<h2 style={{textAlign:"center"}}>Поиск пользователей</h2>}
        content={
        <div>
            <b><p>Вы можете найти другого пользователя и добавить его в друзья</p></b>
            <img className="modal-image" src="https://res.cloudinary.com/dkk8nrpkj/image/upload/v1685704677/photo_5463344554410362377_x_z8pdug.jpg" alt="Описание изображения" />

        </div>
        
        }
        footer={<button onClick={onClose}>Закрыть</button>}
        onClose={onClose}
      />
    </div>
  );
}

export default ChatExample;