import React from 'react'
import AboutExample from '../components/About/Example/AboutExample'
import ChatExample from '../components/About/Example/ChatExample'
import PostExample from '../components/About/Example/PostExample'
import NoteExample from '../components/About/Example/NoteExample'
import NotificationExample from '../components/About/Example/NotificationExample'

function About() {
  return (
    <div>
      <AboutExample/>
      <PostExample/>
      <ChatExample/>
      <NoteExample/>
      <NotificationExample/>
    </div>

  )
}

export default About