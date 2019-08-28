import React, { useState } from 'react'
import { Link } from 'gatsby'

import { IndexPage as IndexBase } from '../'

import { generateKey } from '../../components/utils'
import { useInterval } from '../../components/custom_hooks'

import diagram from '../../images/diagram_french.png'
import carouselImg from '../../images/logo_carousel.jpg'
import preview from '../../images/coming_soon.mp4'

const pageContent = {
  hero: {
    title: `HubRise centralise les données de votre commerce`,
    description: `Reliez votre caisse, votre site Internet et tous vos logiciels.`,
    link: `En savoir plus`,
  },
  main: {
    title: `L'intégration à portée de main`,
    description: `HubRise centralise toutes vos données : commandes, clients, produits...
Les applications raccordées à HubRise peuvent instantanément échanger ces données entre elles.`,
    features: [
      `Commande en ligne`,
      `Logiciel de caisse`,
      `Gestion de livreurs`,
      `Carte de fidélité`,
      `Envoi d'emails`,
      `Applications mobiles`,
      `Et plus encore`,
    ],
  },
}

const formContent = {
  title: `Démarrez maintenant`,
  description: `HubRise est gratuit jusqu'à 50 commandes par mois.`,
  link: `Voir tarifs`,
  placeholders: {
    first_name: `Prénom`,
    last_name: `Nom`,
    email: `Email`,
    password: `Mot de passe`,
  },
  button: `Créer votre compte`,
}

const Video = () => {
  return (
    <section className="section">
      <div className="section__in section__in_padding section__in_reverse">
        <h3 className="section__title">Démonstration</h3>
        <video className="index-video" width="400" controls>
          <source src={preview} />
          Votre navigateur ne supporte pas l'affichage des vidéos HTML5.
        </video>
      </div>
    </section>
  )
}

const Faq = () => {
  const links = [
    `Every request, every bit of data is traced`,
    `Access control with thin grained permissions`,
    `The data belongs to you`,
  ]
  return (
    <section className="section section_full-width section_padding">
      <div className="section__in section__in_green section__in_padding">
        <h3 className="section__title">F.A.Q.</h3>
        <ul className="index-faq">
          {links.map((link, idx) => (
            <li key={generateKey(link, idx)} className="index-faq__item">
              <Link className="index-faq__link" to="/fr/faq">
                {link}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

const CompatibleApps = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [lastActiveIndex, setLastActiveIndex] = useState()
  useInterval(function rotateBanners() {
    setLastActiveIndex(activeIndex)
    setActiveIndex(activeIndex >= lastIndex ? 0 : activeIndex + 1)
  }, 5000)

  const slides = [
    {
      title: `(1) Orderlord: a mobile app to manage your delivery fleet`,
      img: carouselImg,
      description: `First slide details.`,
    },
    {
      title: `(2) Orderlord: a mobile app to manage your delivery fleet`,
      img: carouselImg,
      description: `Second slide details.`,
    },
    {
      title: `(3) Orderlord: a mobile app to manage your delivery fleet`,
      img: carouselImg,
      description: `Second slide details.`,
    },
    {
      title: `(4) Orderlord: a mobile app to manage your delivery fleet`,
      img: carouselImg,
      description: `Second slide details.`,
    },
  ]
  const lastIndex = slides.length - 1

  return (
    <section className="section">
      <div className="section__in section__in_padding section__in_reverse">
        <h3 className="section__title">
          De nouvelles applications tous les mois
        </h3>
        <p className="section__description">
          HubRise est connecté avec un nombre croissant de solutions : JDC/Kezia
          II, Nestor, MyOrderBox, OrderLord...
          <br />
          D'autres intégrations sont en cours.
          <br />
          <Link className="section__description-link" to="/fr/apps">
            Voir les applications disponibles
          </Link>
          <span className="section__description-span">(commerçants)</span>-
          <Link className="section__description-link" to="/fr/developpeurs">
            Connectez votre logiciel à HubRise
          </Link>
          <span className="section__description-span">(développeurs)</span>
        </p>
        <div
          className="index-carousel orbit-wrapper"
          role="region"
          aria-label="Favorite Space Pictures"
        >
          <ul
            className="index-carousel__container orbit-container"
            tabIndex="0"
          >
            <i
              className="index-carousel__arrow index-carousel__arrow_previous orbit-previous fa fa-chevron-circle-left"
              tabIndex="0"
              onClick={() => {
                setLastActiveIndex(activeIndex)
                const newIndex = activeIndex - 1
                setActiveIndex(newIndex < 0 ? lastIndex : newIndex)
              }}
            />
            <i
              className="index-carousel__arrow index-carousel__arrow_next orbit-next fa fa-chevron-circle-right"
              tabIndex="0"
              onClick={() => {
                setLastActiveIndex(activeIndex)
                const newIndex = activeIndex + 1
                setActiveIndex(newIndex > lastIndex ? 0 : newIndex)
              }}
            />
            {slides.map(({ title, img }, idx) => {
              return (
                <li
                  key={generateKey(title, idx)}
                  className="index-carousel__slide orbit-slide"
                  style={{
                    visibility: `${
                      activeIndex === idx || lastActiveIndex === idx
                        ? 'visible'
                        : 'hidden'
                    }`,
                    transform: `translateX(${
                      activeIndex === idx
                        ? '0'
                        : idx < activeIndex
                        ? '-100'
                        : '100'
                    }%)`,
                    transition: `transform .55s ease-out`,
                  }}
                >
                  <span className="index-carousel__title">{title}</span>
                  <img
                    className="index-carousel__image orbit-image"
                    src={img}
                    alt="Space"
                  />
                </li>
              )
            })}
          </ul>
          <nav className="index-carousel__bullets orbit-bullets">
            {slides.map(({ description }, idx) => {
              const isCurrentSlide = activeIndex === idx
              return (
                <button
                  key={generateKey(description, idx)}
                  className={`${isCurrentSlide ? 'is-active' : ''}`}
                  onClick={() => {
                    if (isCurrentSlide) return
                    setLastActiveIndex(activeIndex)
                    setActiveIndex(idx)
                  }}
                >
                  <span className="show-for-sr">{description}</span>
                  {isCurrentSlide && (
                    <span className="show-for-sr">Current slide</span>
                  )}
                </button>
              )
            })}
          </nav>
        </div>
      </div>
    </section>
  )
}

const Philosophy = () => {
  return (
    <section className="section">
      <div className="section__in section__in_padding">
        <h3 className="section__title">Qui sommes-nous ?</h3>
        <p className="section__description section__description_black">
          HubRise est une société basée en France, fondée par des ingénieurs
          spécialisés dans les logiciels de réservation aérienne, et de commande
          en ligne pour les restaurants.
        </p>
        <p className="section__description">
          Notre vision : les commerçants utilisent de plus en plus
          d’applications informatiques pour leur activité, mais celles-ci ne
          communiquent généralement pas entre elles. HubRise veut offrir une
          solution universelle permettant à toutes les applications des
          commerçants de communiquer aisément entre elles.
        </p>
      </div>
    </section>
  )
}

const IndexPage = () => {
  return (
    <IndexBase
      pageContent={pageContent}
      formContent={formContent}
      diagram={diagram}
    >
      <Video />
      <Faq />
      <CompatibleApps />
      <Philosophy />
    </IndexBase>
  )
}

export default IndexPage
