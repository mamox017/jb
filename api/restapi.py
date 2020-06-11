#resource is an object that an api stores
#collection is multiple resources of same type
#create read and delete resources can be done in REST API
#REST API is an interface in which you can get a response from and request to
#REST = REPRESENTATIONAL STATE TRANSFER
#stateless, so holds no data on its own

#get requests - retrieve a resource
#post requests - create a new resource
#delete request - deletes a resource

#endpoints
#collection: /jobs
	#get - view collection
	#post - create new resource (job)
#resource: /job/<id>
	#get - view resource (job)
	#delete - delete resource (job)

from job_registry import app

app.run(host='0.0.0.0', port=80, debug=True)




