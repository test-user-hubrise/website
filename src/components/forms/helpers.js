export const handleSubmit = async (values, { setSubmitting }) => {
  setSubmitting(true)

  const blob = await fetch(
    `https://formspree.io/mwgbedem`,
    {
      method: `POST`,
      headers: { Accept: `application/json` },
      body: JSON.stringify(values)
    }
  )

  // { next: thankYouPageURL, ok: bool }
  const { next } = await blob.json()

  window.location = `https://formspree.io${next}`
}
