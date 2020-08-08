# ORY Kratos Demo

Prototype of identity management with ORY Kratos.

This demo includes registration, login, logout, email verification and a dashboard that displays the current user.

# Running

```
make migrate
make run
```

Then navigate to [https://localhost:8080/](https://localhost:8080/).

To complete email verification, there is also a MailSlurper smtps server runnning at [http://localhost:4436/](http://localhost:4436/).

## Dependencies

- docker
- docker-compose

## Self Signed Certificates

This repo uses self sigend certificates.
If you use a modern browser, you will need to select the "Advanced Options" and "Proceed Anyway".
