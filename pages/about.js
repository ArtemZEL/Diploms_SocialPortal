import React from 'react'
import AboutExample from '../components/About/Example/AboutExample'
import ChatExample from '../components/About/Example/ChatExample'
import PostExample from '../components/About/Example/PostExample'
import NoteExample from '../components/About/Example/NoteExample'
import NotificationExample from '../components/About/Example/NotificationExample'
import ProfileExample from '../components/About/Example/ProfileExample'

function About() {
  return (
    <div>
      <AboutExample/>
      <PostExample/>
      <ChatExample/>
      <NoteExample/>
      <NotificationExample/>
      <ProfileExample/>
    </div>

  )
}

export default About