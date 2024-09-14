import React from 'react';
import "./stylesheets/background-image.css"

const BackgroundImage = ({ src, className }) => {
  return (
      <div className={`background-image ${className}`} style={{backgroundImage: `url(${src})`}}>
      </div>

  )
}

export default BackgroundImage;