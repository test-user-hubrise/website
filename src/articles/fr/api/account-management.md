---
title: Account management
---

## 1. Location

### 1.1 Retrieve location

Get location details.

{% call_summary 'GET /locations/:id' 'location, account' 'GET /location (location only)' %}

#### Example request:

`GET /locations/3r4s3-1`:

```json
{
  "id": "3r4s3-1",
  "name": "Paris",
  "account": {
    "id": "3r4s3",
    "name": "Bella Pizza",
    "currency": "EUR"
  },
  "address": "13 rue du Chant des Oiseaux",
  "postal_code": "75003",
  "city": "Paris",
  "country": "FR",
  "timezone": {
    "name": "Europe/Paris",
    "utc_offset": 7200
  },
  "custom_fields": {
    "latitude": 48.8697246,
    "longitude": 2.3061506
  }
}
```

### 1.2 Update location

Update the `custom_fields` of the location

{% call_summary 'PUT /locations/:id' 'location, account' 'PUT /location (location only)' %}

#### Example request:

`PUT /locations/3r4s3-1`:

```json
{
  "custom_fields": {
    "latitude": 48.8526388,
    "longitude": 2.3042135
  }
}
```

### 1.3 List locations

Returns the locations of the account.

{% call_summary 'GET /locations' 'account' %}

#### Example request:

`GET /locations`:

```json
[
  {
    "id": "3r4s3-1",
    "name": "Paris",
    "account": {
      "id": "3r4s3",
      "name": "Bella Pizza",
      "currency": "EUR"
    }
    ...
  }
  ...
]
```

## 2. Account

### 2.1 Retrieve account

Get account details.

{% call_summary 'GET /accounts/:id' 'account' 'GET /account' %}

#### Example request:

`GET /accounts/3r4s3`:

```json
{
  "id": "3r4s3",
  "name": "Mister Pizza",
  "currency": "EUR"
}
```

## 3. User

### 3.1 Retrieve user

Get user information.

{% call_summary 'GET /user' 'profile, profile_with_email' %}

#### Example request:

`GET /user`:

```json
{
  "id": "v6ap7",
  "first_name": "Tom",
  "last_name": "Jones",
  "email": "tom.jones@gmail.com",
  "timezone": {
    "name": "Europe/Paris",
    "utc_offset": 7200
  },
  "locales": ["en-GB", "fr-FR"]
}
```

The `email` field is included only if the access level is `profile_with_email`.
