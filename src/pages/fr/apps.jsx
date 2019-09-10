import React, { useContext } from 'react'

import Link from '../../components/link'
import Modal from '../../components/modal'
import SuggestAppForm from '../../components/forms/suggest_app'

import AppContext from '../../context'

import { generateKey } from '../../components/utils'

import jdcLogo from '../../images/apps/jdc.png'
import orderLordLogo from '../../images/apps/orderlord.png'
import nestorLogo from '../../images/apps/nestor.png'
import myOrderBoxLogo from '../../images/apps/myorderbox.png'
import cashPadLogo from '../../images/apps/cashpad.png'
import livePepperLogo from '../../images/apps/livepepper.png'
import acrelecLogo from '../../images/apps/acrelec.png'
import alloRestoLogo from '../../images/apps/alloresto.png'
import nextMenuLogo from '../../images/apps/nextmenu.png'
import yProximiteLogo from '../../images/apps/yproximite.png'
import mailChimpLogo from '../../images/apps/mailchimp.png'

const AppSection = ({ title, blocks, extraBlock }) => {
  return (
    <section className='section'>
      <div className='section__in section__in_padding section__in_reverse'>
        <h3 className='section__title section__title_align-left'>{title}</h3>
        <ul className='apps'>
          {blocks.map(
            ({ title, to, domain, logo, description, additionalInfo }, idx) => (
              <li key={generateKey(title, idx)} className='app'>
                <div className='app__title'>{title}</div>
                <Link className='app__box' to={to} target='_blank'>
                  <img className='app__box-image' src={logo} alt={title} />
                </Link>
                <div className='app__description'>
                  {description}
                  {additionalInfo && (
                    <p style={{ fontSize: `0.9rem` }}>
                      <i>{additionalInfo}</i>
                    </p>
                  )}
                </div>
                <div className='app__more'>
                  <Link className='app__more-link' to={to} target='_blank'>
                    {domain}
                  </Link>
                </div>
              </li>
            )
          )}
          {extraBlock}
        </ul>
      </div>
    </section>
  )
}

const SuggestApp = () => {
  const { forms } = useContext(AppContext)

  return (
    <li className='app'>
      <div className='app__title'>Proposer une application</div>
      <button
        className='app__box app__box_suggest-app'
        data-open='suggest-app'
        aria-controls='suggest-app'
        aria-haspopup='true'
        tabIndex='0'
        onClick={forms.suggestApp.toggle}
      >
        <div className='app__box-image app__box-image_suggest-app'>
          <span>?</span>
        </div>
      </button>
      <div className='app__description'>
        Votre application ne se trouve pas dans cette liste ?
      </div>
      <div className='app__more'>
        <button
          className='app__more-link'
          data-open='suggest-app'
          aria-controls='suggest-app'
          aria-haspopup='true'
          tabIndex='0'
          onClick={forms.suggestApp.toggle}
        >
          Proposer
        </button>
      </div>
    </li>
  )
}

const Intro = () => {
  const { forms } = useContext(AppContext)

  return (
    <section className='section'>
      <div className='section__in section__in_padding'>
        <h3 className='section__title'>
          Les applications disponibles
          <br />
          ou bientôt disponibles
        </h3>
        <div className='section__description'>
          <p>
            Vous êtes commerçant et votre application ne figure pas dans cette
            liste ?
            <button
              className='section__description-link section__description-link_black'
              data-open='contact-us'
              aria-controls='contact-us'
              aria-haspopup='true'
              tabIndex='0'
              onClick={forms.contact.toggle}
            >
              Contactez-nous
            </button>
          </p>
          <p>
            Vous êtes développeur et souhaitez intégrer votre application à
            HubRise ?
            <Link
              className='section__description-link section__description-link_black'
              to='/developpeurs'
            >
              Voir la documentation technique
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

const ForDevelopers = () => {
  return (
    <section className='section section_full-width section_padding'>
      <div className='section__in section__in section__in_green section__in_padding'>
        <h3 className='section__title section__title_white'>
          Vous êtes développeur ?
        </h3>
        <p className='section__description_white'>
          Utilisez notre API pour construire une application utile aux
          commerçants. Proposez-la aux utilisateurs d'HubRise en la publiant sur
          notre site.
        </p>
        <p className='section__description_white'>
          Nos utilisateurs sont des professionnels en recherche de solutions
          pour moderniser leur activité.
          <br />
          Il y a beaucoup à faire, et les bonnes idées d'aujourd'hui sont les
          standards de demain.
        </p>
      </div>
    </section>
  )
}

const sections = [
  {
    title: `Logiciels de caisse`,
    blocks: [
      {
        title: `Kezia II / JDC`,
        to: `https://www.jdc.fr/caisse-enregistreuse/`,
        domain: `jdc.fr`,
        logo: jdcLogo,
        description: `Logiciel de caisse développé par JDC, le leader français des solutions d'encaissement. Kezia II s'adapte à tous les types de commerces.`
      },
      {
        title: `OrderLord POS`,
        to: `https://www.orderlord.com`,
        domain: `orderlord.com`,
        logo: orderLordLogo,
        description: `Logiciel de caisse spécialisé en livraison. Nombreuses fonctionnalités de gestion de livreurs.`,
        additionalInfo: `En anglais uniquement`
      },
      {
        title: `Nestor`,
        to: `http://www.logiciel-de-livraison.com/`,
        domain: `logiciel-de-livraison.com`,
        logo: nestorLogo,
        description: `Un logiciel de caisse conçu pour la livraison à domicile et la vente à emporter.`
      },
      {
        title: `MyOrderBox`,
        to: `http://www.myorderboxhq.com`,
        domain: `myorderboxhq.com`,
        logo: myOrderBoxLogo,
        description: `Logiciel de caisse facile à installer.`,
        additionalInfo: `En anglais uniquement`
      },
      {
        title: `CashPad`,
        to: `https://www.cashpad.fr`,
        domain: `cashpad.fr`,
        logo: cashPadLogo,
        description: `Logiciel de caisse et caisse enregistreuse iPad pour la restauration.`,
        additionalInfo: `Intégration prévue`
      }
    ],
    extraBlock: <SuggestApp />
  },
  {
    title: `Commande en ligne`,
    blocks: [
      {
        title: `LivePepper`,
        to: `http://www.livepepper.fr/`,
        domain: `livepepper.fr`,
        logo: livePepperLogo,
        description: `Solution de commande en ligne pour les restaurants. Adapté aux indépendants comme aux chaînes.`
      },
      {
        title: `Acrelec`,
        to: `http://www.acrelec.fr/`,
        domain: `acrelec.fr`,
        logo: acrelecLogo,
        description: `Solutions Drive et bornes de commande avec terminal de paiement intégré.`,
        additionalInfo: `En cours d'intégration`
      },
      {
        title: `AlloResto`,
        to: `https://www.just-eat.fr/`,
        domain: `just-eat.fr`,
        logo: alloRestoLogo,
        description: `Portail de vente en ligne de repas.`,
        additionalInfo: `Intégration prévue`
      },
      {
        title: `NextMenu`,
        to: `https://www.nextmenu.com/`,
        domain: `nextmenu.com`,
        logo: nextMenuLogo,
        description: `Tablettes de commande individuelles pour les restaurants.`,
        additionalInfo: `Intégration prévue`
      },
      {
        title: `Y-Proximité`,
        to: `http://www.y-proximite.fr/`,
        domain: `y-proximite.fr`,
        logo: yProximiteLogo,
        description: `Agence digitale et éditeur de solutions de commande en ligne pour les PME et petits commerçants.`,
        additionalInfo: `En cours d'intégration`
      }
    ]
  },
  {
    title: `Autres applications`,
    blocks: [
      {
        title: `OrderLord`,
        to: `https://www.orderlord.com`,
        domain: `orderlord.com`,
        logo: orderLordLogo,
        description: `Logiciel de gestion de flotte de livreurs, connecté aux livreurs par des terminaux GPS.`
      },
      {
        title: `MailChimp`,
        to: `https://mailchimp.com/`,
        domain: `mailchimp.com`,
        logo: mailChimpLogo,
        description: `Solution d'envoi d'emails et de newsletter personnalisés.`
      }
    ]
  }
]

const AppsPage = () => {
  const { forms } = useContext(AppContext)

  return (
    <>
      <Intro />
      {sections.map((sectionProps, idx) => (
        <AppSection
          key={generateKey(sectionProps.title, idx)}
          {...sectionProps}
        />
      ))}
      <ForDevelopers />
      {forms.suggestApp.isVisible && (
        <Modal
          title='Proposer une Application'
          description='Dnteger viverra non lorem vitae efficitur. Nam quis nunc erat.
          Mauris aliquet ullamcorper maximus. Quisque faucibus felis metus, eget
          iaculis lectus aliquet non.'
          onClose={forms.suggestApp.toggle}
        >
          <SuggestAppForm />
        </Modal>
      )}
    </>
  )
}

export default AppsPage
