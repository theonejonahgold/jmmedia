import Head from 'next/head'
import { Background } from '../../components/Common'
import ContentSection, {
  SectionColumn,
  SectionHeading,
  SectionParagraph,
} from '../../components/Section'
import Header, { HeaderHeading } from '../../components/Header'
import { Embed, EmbedContainer } from '../../components/Common/Embed'
import { useState } from 'react'

export default () => {
  const [displayEmbed, setDisplayEmbed] = useState(false)
  return (
    <>
      <Head>
        <title>Lori Yiu - Jonah Meijers</title>
      </Head>
      <Background currentPage="/film/loriyiu">
        <Header>
          <HeaderHeading>Integrale Eindpresentatie Lori Yiu</HeaderHeading>
        </Header>
        <ContentSection dark>
          <SectionColumn column={2} span={4}>
            <button
              onClick={() =>
                displayEmbed ? setDisplayEmbed(false) : setDisplayEmbed(true)
              }
            >
              Spelen kreng
            </button>
          </SectionColumn>
        </ContentSection>
        <ContentSection light>
          <SectionColumn column={2} span={1}>
            <SectionHeading light>Concert als scriptie.</SectionHeading>
            <SectionParagraph light>
              Lori Yiu gaf afgelopen schooljaar haar Integrale Eindpresentatie
              (IEP) op het conservatorium in Utrecht. De Integrale
              Eindpresentatie is een cruciaal onderdeel van het afstudeertraject
              van de opleiding muziekdocent op het Utrechts Conservatorium.
            </SectionParagraph>
            <SectionParagraph light>
              Lori's IEP was in de stijl van een typisch jaren '70 concert,
              waarbij ze een zeer dierbare setlist vol passie en hartstocht
              tentoonstelde. Ik had het genoegen om dit belangrijke moment voor
              Lori vast te leggen als nét-echte concertfilm. Met meerdere
              camerahoeken, een lichte kleurcorrectie en meeslepende effecten
              accentueert de film de passies en emoties die die avond
              overduidelijk te voelen waren.
            </SectionParagraph>
          </SectionColumn>
          <SectionColumn column={4} span={2}></SectionColumn>
        </ContentSection>
      </Background>
      {displayEmbed && (
        <EmbedContainer>
          <Embed
            src="https://www.youtube.com/embed/SVP3KVp9CPY"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></Embed>
        </EmbedContainer>
      )}
    </>
  )
}
