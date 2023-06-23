/*
<--------------- Imports and Interface --------------->
*/

import React from "react";
import { Character } from "../../utilities";
import "./BackgroundGallery.scss";

interface BackgroundGalleryProps {
  selectedCharacter: Character;
}

/*
<--------------- Component --------------->
*/

const BackgroundGallery: React.FC<BackgroundGalleryProps> = ({
  selectedCharacter,
}) => {
  /*
  <--------------- Variables --------------->
  */
  const { charId, category } = selectedCharacter;
  let backgroundPath = `./backgrounds/${charId}.png`;

  const imageExists = checkIfImageExists(backgroundPath);

  if (!imageExists) {
    backgroundPath = `./backgrounds/${category}.png`;
  }

  /*
  <--------------- Function --------------->
  */

  function checkIfImageExists(url: string) {
    const http = new XMLHttpRequest();
    http.open("HEAD", url, false);
    http.send();
    return http.status !== 404;
  }

  /*
  <--------------- Rendering --------------->
  */

  return (
    <div className="background-gallery">
      <img
        className="background-image"
        key={charId}
        src={backgroundPath}
        alt={charId}
      />
    </div>
  );
};

export default BackgroundGallery;
