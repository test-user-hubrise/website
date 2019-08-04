import React from 'react'

const SidebarRight = ({ currentPath, title, headings }) => (
  <div className="section__sidebar section__sidebar_right section__sidebar_small-padding">
    <div className="section__sidebar-in" data-floater-float-me="">
      <h5 className="content-nav__title">
        Content
      </h5>
      <h5 className="content-nav__title content-nav__title_small" id="content-nav">
        Content
        <i className="fa fa-angle-down content-nav__arrow"></i>
      </h5>
      <ul className="content-nav__list content-nav__list_hidden" id="content-nav-list">
        <li className="content-nav__item content-nav__item_active">
          <a href={currentPath} className="content-nav__link">
            {title}
          </a>
          <ol className="content-sublist">
            {headings
              .filter(({ depth }) => depth === 2)
              .map(({ value: heading }, idx) => {
                const attribute = heading.slice(3).toLowerCase().split(` `).join(`-`)
                return (
                  <li
                    key={`${heading}--${idx}`}
                    className="content-sublist-item content-sublist-level-2"
                  >
                    <a className="content-sublist-link" href={`#${attribute}`}>
                      <span className="content-sublist-text">
                        {heading}
                      </span>
                    </a>
                  </li>
                )
              })}
          </ol>
        </li>
      </ul>
    </div>
  </div>
)

export default SidebarRight
