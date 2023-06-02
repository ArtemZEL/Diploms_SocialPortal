import React, { useState } from 'react';
import ModalInformation from '../AboutProg';
function NotificationExample() {
  const [isModal, setModal] = useState(false);
  const onClose = () => setModal(false);

  return (
    <div>
      <div className='modalW'>
        <button onClick={() => setModal(true)}>Уведомление</button>
      </div>
      <ModalInformation
        visible={isModal}
        title={<h2 style={{ textAlign: "center" }}>"Уведомление"</h2>}
        content={
          <div>
            <b><p>Окно уведомлений - это элемент интерфейса, предназначенный для отображения различных уведомлений, связанных с активностью пользователя. В нем могут отображаться уведомления о различных событиях, таких как оценки постов, добавление в друзья, новые сообщения и другие важные события. Окно уведомлений обычно содержит краткую информацию о каждом уведомлении, например, имя пользователя, выполнившего действие, и тип действия. Оно позволяет пользователям легко получать и просматривать важные уведомления без необходимости переходить на другие страницы или разделы приложения.</p></b>
            <img className="modal-image" src="https://res.cloudinary.com/dkk8nrpkj/image/upload/v1685701379/photo_5461092754596680048_x_baknx3.jpg" alt="Описание изображения" />

          </div>

        }
        footer={<button onClick={onClose}>Закрыть</button>}
        onClose={onClose}
      />
    </div>
  );
}

export default NotificationExample;