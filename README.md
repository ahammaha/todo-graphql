# todo-graphql


To set up Hasura
================
* run the docker compose file
* then start flask 
* then the login to the hasura http://localhost:8080/console using hasura secret key="maha"
go to the http://localhost:8080/console/data/schema/public now task and user table should be seen under untracked tables. make it as tracked clicking on the track button(because flask relationship has issues need to get it solved so mutation from flask wont working properly for relationship)
* then go to the remote schema tab => http://localhost:8080/console/remote-schemas/manage/schemas => click add => give schema name => and give schema url as http://172.17.0.1:5000/graphql (ie: since hasura runs in docker we need to give docker0 ip to acccess to local flask) => select forward all headers


To start flask
==============
cd flask_todo
python3 -m venv venv
. venv/bin/activate
flask db init
flask db migrate
flask db upgrade
flask run --host="0.0.0.0"


To start react
==============
npm start


Sample queries
==============
* List tasks(query from flask endpoint)
=============
query{
 tasks{
  id
  title
  description
  createdBy
  status
} 
}

* Insert task(mutation from hasura)
===================================
mutation{
  insert_task(objects:{id: $id, title: $title, description: $description, status:"incomplete", created_by: $createdBy}) {
    returning{
      id
      title
      description
      status
      created_by
    }
  }
}
