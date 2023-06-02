import React, { useState } from 'react'
import ModalInformation from '../AboutProg';
function ProfileExample() {
    const [isModal, setModal] = useState(false);
    const onClose = () => setModal(false);

    return (
        <div>
            <div className='modalW'>
                <button onClick={() => setModal(true)}>О профиле</button>
            </div>
            <ModalInformation
                visible={isModal}
                title={<h2 style={{ textAlign: "center" }}>Создание поста</h2>}
                content={
                    <div>
                        <p><b>В вашем профиле вы имеете следующие возможности:</b></p>
                        

                        <p>- <b>Просмотреть все посты, которые вы добавили.</b> Вы можете легко просматривать и управлять своими публикациями, а также открывать их для просмотра другим пользователям.</p>
                        <img className="modal-image" src="https://res.cloudinary.com/dkk8nrpkj/image/upload/v1685703937/photo_5463344554410362364_y_okn9hs.jpg" alt="Описание изображения" />

                        <p>- <b>Узнать количество друзей и подписчиков.</b> Вы можете видеть сколько пользователей подписано на вас и сколько вы сами подписаны на других пользователей.</p>
                        <img className="modal-image" src="https://res.cloudinary.com/dkk8nrpkj/image/upload/v1685704170/photo_5463344554410362365_x_v1hzji.jpg" alt="Описание изображения" />
                        <img className="modal-image" src="https://res.cloudinary.com/dkk8nrpkj/image/upload/v1685704178/photo_5463344554410362366_x_ng3s5u.jpg" alt="Описание изображения" />

                        <p>- <b>Обновить ваш профиль.</b> Вы можете внести изменения в свою информацию, такие как фото профиля, описание, контактные данные и другие детали, чтобы ваш профиль всегда был актуален.</p>
                        <img className="modal-image" src="https://res.cloudinary.com/dkk8nrpkj/image/upload/v1685704252/photo_5463344554410362368_x_f00yyi.jpg" alt="Описание изображения" />


                        <p>- <b>Использовать дополнительные настройки.</b> В вашем профиле есть возможность настроить дополнительные параметры, такие как скрытие сообщений или обновление пароля. Вы можете контролировать приватность своих данных и обеспечить безопасность вашего аккаунта.</p>
                        <img className="modal-image" src="https://res.cloudinary.com/dkk8nrpkj/image/upload/v1685704306/photo_5463344554410362369_x_d8lu1l.jpg" alt="Описание изображения" />

                    </div>
                }
                footer={<button onClick={onClose}>Закрыть</button>}
                onClose={onClose}
            />
        </div>
    );
}

export default ProfileExample