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
        title={<h2 style={{ textAlign: "center" }}>Создание поста</h2>}
        content={
          <div>
            <b><p>
              Вы имеете возможность добавлять разные типы постов, такие как текстовые, изображения и видео. В текстовых постах вы можете написать свое сообщение или делиться информацией. При добавлении изображений и видео вы можете загрузить файлы с компьютера или указать ссылки на соответствующие ресурсы. Помимо этого, вы можете делать репосты чужих публикаций, включая ссылку на оригинальный пост. Это позволяет вам распространять и делиться интересным контентом, созданным другими пользователями, с вашей аудиторией.</p></b>
            <img className="modal-image" src="https://res.cloudinary.com/dkk8nrpkj/image/upload/v1685701788/photo_5461092754596680050_x_xqqyin.jpg" alt="Описание изображения" />
            <b><p>У вас есть возможность обрезать изображение перед его публикацией. Это позволяет вам подготовить и настроить изображение в соответствии с вашими предпочтениями или требованиями платформы, на которую вы публикуете. Вы можете выбрать нужную область изображения и обрезать ее для достижения желаемого эффекта перед тем, как опубликовать изображение.</p></b>
            <img className="modal-image" src="https://res.cloudinary.com/dkk8nrpkj/image/upload/v1685701998/photo_5461092754596680063_y_aeknol.jpg" alt="Описание изображения" />
            <b><p>Что бы убрать и непостить ваш пост нажмите на кнопку "F5"</p></b>
          </div>
        }
        footer={<button onClick={onClose}>Закрыть</button>}
        onClose={onClose}
      />
    </div>
  );
}

export default ChatExample;
