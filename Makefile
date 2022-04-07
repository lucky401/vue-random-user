start:
	docker-compose up --detach
build:
	docker-compose up --detach --build
shell:
	docker-compose exec vue-random-user bash
logs:
	docker-compose logs --follow vue-random-user
stop:
	docker-compose stop
destroy:
	docker-compose down
list:
	docker-compose ps
