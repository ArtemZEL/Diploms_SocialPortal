import React, { useState } from 'react';
import ModalInformation from '../AboutProg';


function AboutExample() {
  const [isModal, setModal] = useState(false);
  const onClose = () => setModal(false);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Информация о "Белстат портал"</h1>
     <div className='modalW'>
      <button onClick={() => setModal(true)} >О программе</button>
     </div>
      <ModalInformation
        visible={isModal}
        title={<h2 style={{textAlign:"center"}}>О программе</h2>}
        content={
         <div>
            <p>Вас приветствует веб-приложение <b>"Белстат-портал"</b>. Здесь вы можете работать в команде, создавать публикации и получать доступ к широкому спектру возможностей портала.</p>
            <img className="modal-image" src="https://res.cloudinary.com/dkk8nrpkj/image/upload/v1685043522/Welcome_xfma0o.png" alt="Описание изображения" />
         </div>
         
      }
        footer={<button onClick={onClose}>Закрыть</button>}
        onClose={onClose}
      />
    </div>
  );
}

export default AboutExample;
