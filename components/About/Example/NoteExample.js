import React, { useState } from 'react';
import ModalInformation from '../AboutProg';
function NoteExample() {
  const [isModal, setModal] = useState(false);
  const onClose = () => setModal(false);

  return (
    <div>
      <div className='modalW'>
        <button onClick={() => setModal(true)}>Заметки</button>
      </div>
      <ModalInformation
        visible={isModal}
        title={<h2 style={{ textAlign: "center" }}>Заметки</h2>}
        content={
          <div>
            <b><p>Заметках используется:</p></b>
            <ul>
              <li><strong>Заголовок заметки:</strong> это название или краткое описание содержимого заметки.</li>
              <li><strong>Описание заметки:</strong> это более подробное описание содержимого заметки, которое может включать текст, ссылки, форматирование и другие элементы.</li>
              <li><strong>Теги:</strong> это ключевые слова или фразы, которые помогают классифицировать и организовывать заметки по определенным категориям или темам. Теги облегчают поиск и фильтрацию заметок по определенным критериям.</li>
              <li><strong>Цвет заметки:</strong> это опциональный атрибут, который позволяет пользователю устанавливать цветовую метку для заметки. Цвет может использоваться для визуальной идентификации и категоризации заметок.</li>
            </ul>
            <img className="modal-image" src="https://res.cloudinary.com/dkk8nrpkj/image/upload/v1685700515/photo_5461092754596680026_x_wtbgka.jpg" />
            <b><p>Для добавления заметки необходимо нажать на кнопку "Добавить заметку".</p></b> 
            <img className="modal-image" src="https://res.cloudinary.com/dkk8nrpkj/image/upload/v1685700578/photo_5461092754596680029_x_hoonly.jpg" />
            <b><p>Чтобы обновить заметку, необходимо нажать на кнопку "Изменить". После этого отобразится окно для внесения изменений.</p></b>
            <img className="modal-image" src="https://res.cloudinary.com/dkk8nrpkj/image/upload/v1685700680/photo_5461092754596680031_m_xhjvyu.jpg" />
            <b><p>Окно изменений</p></b>
            <img className="modal-image" src="https://res.cloudinary.com/dkk8nrpkj/image/upload/v1685700747/photo_5461092754596680032_x_xjdutd.jpg" />
         
          </div>

        }
        footer={<button onClick={onClose}>Закрыть</button>}
        onClose={onClose}
      />
    </div>
  );
}

export default NoteExample;