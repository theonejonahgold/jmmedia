import { RefObject, useState, Component } from 'react'
import Gallery from 'react-photo-gallery'
import { ListContext } from './Context'
import Image from './Image'
import Lightbox from './Lightbox'

const testPhotos = {
  small: [
    {
      src:
        'https://storage.googleapis.com/filmportfolio/fotografie/klein/afwas-zweden.jpeg',
      width: 3,
      height: 2,
      title: 'Afwas die ligt te drogen op een houten plank in het bos.',
    },
    {
      src:
        'https://storage.googleapis.com/filmportfolio/fotografie/klein/big-ben-en-de-tower.jpeg',
      width: 3,
      height: 2,
      title: 'De big ben in de stijgers naast de tower bij nacht.',
    },
    {
      src:
        'https://storage.googleapis.com/filmportfolio/fotografie/klein/bloem-macro.jpeg',
      width: 3,
      height: 2,
      title: 'Macro shot van een paarse bloem.',
    },
    {
      src:
        'https://storage.googleapis.com/filmportfolio/fotografie/klein/boom-met-zon.jpeg',
      width: 2,
      height: 3,
      title: 'De zon die door de bomen in Zweden schemert.',
    },
    {
      src:
        'https://storage.googleapis.com/filmportfolio/fotografie/klein/crea.jpeg',
      width: 3,
      height: 2,
      title: 'Het CREA gebouw in Amsterdam bij zonsondergang.',
    },
    {
      src:
        'https://storage.googleapis.com/filmportfolio/fotografie/klein/ketel.jpeg',
      width: 3,
      height: 2,
      title: 'Foto van een zwartgeblakerde ketel.',
    },
    {
      src:
        'https://storage.googleapis.com/filmportfolio/fotografie/klein/klokkentoren-st.-pauls-cathedral.jpeg',
      width: 2,
      height: 3,
      title:
        'Foto van een van de klokkentorens van sint pauls kathedraal in Londen.',
    },
    {
      src:
        'https://storage.googleapis.com/filmportfolio/fotografie/klein/koffie-na-houthakken.jpeg',
      width: 3,
      height: 2,
      title:
        'Een lekkere kop koffie na het houthakken, de hakbijl rustend in de achtergrond.',
    },
    {
      src:
        'https://storage.googleapis.com/filmportfolio/fotografie/klein/leidse-gracht.jpeg',
      width: 3,
      height: 2,
      title: 'Foto van een van de grachten in Leiden.',
    },
    {
      src:
        'https://storage.googleapis.com/filmportfolio/fotografie/klein/londen-appartement.jpeg',
      width: 3,
      height: 2,
      title: 'Foto van het uiterste puntje van een Londens appartement.',
    },
    {
      src:
        'https://storage.googleapis.com/filmportfolio/fotografie/klein/nachtfoto-buslichten.jpeg',
      width: 3,
      height: 2,
      title:
        'Nachtfoto op lange sluitertijd van de Kanaalkade in Alkmaar, terwijl er een bus langsreedt.',
    },
    {
      src:
        'https://storage.googleapis.com/filmportfolio/fotografie/klein/silhouette.jpeg',
      width: 2,
      height: 3,
      title: 'Silhouette van een kleien mannetje.',
    },
    {
      src:
        'https://storage.googleapis.com/filmportfolio/fotografie/klein/toolenburg.jpeg',
      width: 3,
      height: 2,
      title: 'Foto van een picknickbankje bij de Toolenburgerplas.',
    },
  ],
  large: [
    {
      src:
        'https://storage.googleapis.com/filmportfolio/fotografie/groot/afwas-zweden.jpeg',
      width: 3,
      height: 2,
      title: 'Afwas die ligt te drogen op een houten plank in het bos.',
    },
    {
      src:
        'https://storage.googleapis.com/filmportfolio/fotografie/groot/big-ben-en-de-tower.jpeg',
      width: 3,
      height: 2,
      title: 'De big ben in de stijgers naast de tower bij nacht.',
    },
    {
      src:
        'https://storage.googleapis.com/filmportfolio/fotografie/groot/bloem-macro.jpeg',
      width: 3,
      height: 2,
      title: 'Macro shot van een paarse bloem.',
    },
    {
      src:
        'https://storage.googleapis.com/filmportfolio/fotografie/groot/boom-met-zon.jpeg',
      width: 2,
      height: 3,
      title: 'De zon die door de bomen in Zweden schemert.',
    },
    {
      src:
        'https://storage.googleapis.com/filmportfolio/fotografie/groot/crea.jpeg',
      width: 3,
      height: 2,
      title: 'Het CREA gebouw in Amsterdam bij zonsondergang.',
    },
    {
      src:
        'https://storage.googleapis.com/filmportfolio/fotografie/groot/ketel.jpeg',
      width: 3,
      height: 2,
      title: 'Foto van een zwartgeblakerde ketel.',
    },
    {
      src:
        'https://storage.googleapis.com/filmportfolio/fotografie/groot/klokkentoren-st.-pauls-cathedral.jpeg',
      width: 2,
      height: 3,
      title:
        'Foto van een van de klokkentorens van sint pauls kathedraal in Londen.',
    },
    {
      src:
        'https://storage.googleapis.com/filmportfolio/fotografie/groot/koffie-na-houthakken.jpeg',
      width: 3,
      height: 2,
      title:
        'Een lekkere kop koffie na het houthakken, de hakbijl rustend in de achtergrond.',
    },
    {
      src:
        'https://storage.googleapis.com/filmportfolio/fotografie/groot/leidse-gracht.jpeg',
      width: 3,
      height: 2,
      title: 'Foto van een van de grachten in Leiden.',
    },
    {
      src:
        'https://storage.googleapis.com/filmportfolio/fotografie/groot/londen-appartement.jpeg',
      width: 3,
      height: 2,
      title: 'Foto van het uiterste puntje van een Londens appartement.',
    },
    {
      src:
        'https://storage.googleapis.com/filmportfolio/fotografie/groot/nachtfoto-buslichten.jpeg',
      width: 3,
      height: 2,
      title:
        'Nachtfoto op lange sluitertijd van de Kanaalkade in Alkmaar, terwijl er een bus langsreedt.',
    },
    {
      src:
        'https://storage.googleapis.com/filmportfolio/fotografie/groot/silhouette.jpeg',
      width: 2,
      height: 3,
      title: 'Silhouette van een kleien mannetje.',
    },
    {
      src:
        'https://storage.googleapis.com/filmportfolio/fotografie/groot/toolenburg.jpeg',
      width: 3,
      height: 2,
      title: 'Foto van een picknickbankje bij de Toolenburgerplas.',
    },
  ],
}

const imageRenderer = props => {
  return <Image {...props} />
}

type ListState = {
  lightboxOpen: boolean
  lightboxAnimating: boolean
  currentIndex: number
  ref: RefObject<HTMLImageElement>
}

export class List extends Component<{}, ListState> {
  state = {
    lightboxOpen: undefined,
    lightboxAnimating: undefined,
    currentIndex: undefined,
    ref: undefined,
  }

  render() {
    const { currentIndex, lightboxOpen, lightboxAnimating, ref } = this.state
    return (
      <ListContext.Provider
        value={{
          currentIndex: currentIndex,
          ref,
          lightboxOpen,
          lightboxAnimating,
          setState: this.setState.bind(this),
        }}
      >
        <Gallery
          photos={testPhotos.small}
          renderImage={imageRenderer}
          margin={0}
          targetRowHeight={400}
        />
        <Lightbox photos={testPhotos} index={currentIndex} />
      </ListContext.Provider>
    )
  }
}
