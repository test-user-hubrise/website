import React from 'react'
import { Link } from 'gatsby'

const SignupForm = () => (
  <div className="index-hero__form">
    <div className="index-hero__form-in">
      <h5 className="index-hero__form-title">
        Get started now
      </h5>
      <p className="index-hero__form-description">
        <span>HubRise is free up to 50 orders per month.</span>
        {` `}
        <Link className="index-hero__form-link" to="/pricing">
          See pricing
        </Link>
      </p>
      <form
        className="form"
        action="https://manager.hubrise.com/signup"
        id="main-form"
      >
        <div className="form__block">
          <label htmlFor="hr_first_name"></label>
          <input
            className="form__input"
            type="text"
            placeholder="First Name"
            name="hr_user[first_name]"
            id="hr_first_name"
          />
        </div>
        <div className="form__block">
          <label htmlFor="hr_last_name"></label>
          <input
            className="form__input"
            type="text"
            placeholder="Last Name"
            name="hr_user[last_name]"
            id="hr_last_name"
          />
        </div>
        <div className="form__block">
          <label htmlFor="hr_email"></label>
          <input
            className="form__input"
            type="email"
            placeholder="Email"
            name="hr_user[email]"
            id="hr_email"
          />
        </div>
        <div className="form__block">
          <label htmlFor="hr_password"></label>
          <input
            className="form__input"
            type="password"
            placeholder="Password"
            name="hr_user[password]"
            id="hr_password"
          />
        </div>
        <button
          className="form__button form__button_full-width"
          type="submit"
          name="submit"
        >
          Create your account
        </button>
      </form>
    </div>
  </div>
)

export default SignupForm
