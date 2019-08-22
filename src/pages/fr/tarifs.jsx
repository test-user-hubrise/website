import React from 'react'
import PropTypes from 'prop-types'

import { PricingPage as PricingBase } from '../pricing'

const pageContent = {
  title: `Un abonnement mensuel pour une utilisation illimitée`,
  pricing: {
    value: `25€ HT / mois`,
    subtitle: `par point de vente`,
    features: [
      `Nombre de commandes : illimité`,
      `Nombre de clients : illimité`,
      `Nombre de produits : illimité`,
      `Nombre d'applications connectées : illimité`,
    ],
    button: `Démarrer maintenant`,
  },
  callToAction: [
    {
      id: `free`,
      title: `Gratuit :`,
      description: `usqu'à 50 commandes et 50 clients par mois.`,
      linkText: `Démarrer maintenant`,
    },
    {
      id: `large_accounts`,
      title: `Pour les chaînes :`,
      description: `Tarifs dégressifs à partir de 5 points de vente.`,
      linkText: `Nous contacter`,
    },
  ],
}

const PricingPage = ({ pageContent }) => {
  return (
    <PricingBase
      pageContent={pageContent}
      callToActionExtra={
        <div className="section__link-block">
          <a
            className="section__description-link section__description-link_black section__description-link_bold"
            href="/fr/faq#abonnement"
          >
            Voir notre F.A.Q. concernant l'abonnement
          </a>
        </div>
      }
    ></PricingBase>
  )
}

PricingPage.propTypes = {
  pageContent: PropTypes.objectOf(PropTypes.any).isRequired,
}

export default () => <PricingPage pageContent={pageContent} />