migrate:
	docker-compose run kratos-migrate

run:
	docker-compose up --build login \
		postgresd \
		mailslurper \
		kratos
