import React from 'react'

import { DevelopersPage as DevelopersBase } from '../developers'

const pageContent = {
  hero: {
    title: `Connectez votre application à HubRise`,
    description: {
      first_part: `Une seule intégration rend votre application compatible avec tout l'écosystème HubRise.`,
      link: `Contactez-nous`,
      second_part: `pour plus d'informations ou pour toute question technique.`,
    },
  },
  thumbs: [
    {
      id: `quick_start`,
      title: `Démarrage rapide`,
      description: `En 10 minutes, envoyez vos premières requêtes à l'API (en anglais)`,
    },
    {
      id: `general_concepts`,
      title: `Référence de l'API`,
      description: `Toutes les ressources de l'API sont documentées ici (en anglais)`,
    },
    {
      id: `authentication`,
      title: `Authentification`,
      description: `Introduction à OAuth 2.0 et son implémentation dans HubRise (en anglais)`,
    },
    {
      id: `integration`,
      title: `Intégration`,
      description: `Checklist d'intégration, couvrant plusieurs types d'applications (en anglais)`,
    },
  ],
}

const DevelopersPage = ({ uri }) => {
  return <DevelopersBase pageContent={pageContent} uri={uri} />
}

export default DevelopersPage
