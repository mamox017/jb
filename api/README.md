# Job Listings REST API

## Usage

All responses will have the form

```json
{
	"data": "Mixed type holding the content of the response",
	"message": "Description of what happened"
}
```

Subsequent response definitions will only detail the expected value of the 'data field'

### List all devices

**Definition**

`GET /jobs`

**Response**

- `200 OK` on success

```json
[
	{
		"id": "a1b2c3d4f5g6h7i8j9k0l",
		"category": "category",
		"city": "city name",
		"state": "state abbreviation",
		"employer": "e.g. Microsoft",
		"title": "e.g. Site Reliability Engineer",
		"description": "desc"
	},
	{
		"id": "l0k9j8i7h6g5f4d3c2b1a",
		"category": "category",
		"city": "city name",
		"state": "state abbreviation",
		"employer": "e.g. Amazon",
		"title": "e.g. Software Development Engineer I",
		"description": "desc"
	}
]
```

## Posting a new job

**Definition**

`POST /jobs`

**Arguments**

- `"id":string` a globally unique identifier for this job
- `"category":string` a category or industry in which this job lies
- `"city":string` the city in which the job is located
- `"state":string` the state in which the job is located
- `"employer":string` the employer who is offering the job
- `"title":string` the title in which the job entails
- `"description":string` the description of the job

If a job with the given id already exists, the existing job will be overwritten.

**Response**

- `201 Created` on success

```json
{
	"id": "bDBrOWo4aTdoNmc1ZjRkM2MyYjFh",
	"category": "Tech",
	"city": "Palo Alto",
	"state": "CA",
	"employer": "Google",
	"title": "e.g. Tech Lead",
	"description": "..."
}
```

## Lookup job details

`GET /job/<identifier>`

```json
{
	"id": "bDBrOWo4aTdoNmc1ZjRkM2MyYjFh",
	"category": "Tech",
	"city": "Palo Alto",
	"state": "CA",
	"employer": "Google",
	"title": "e.g. Tech Lead",
	"description": "..."
}
```

## Delete a job

`DELETE /jobs/<identifier>`

**Response**

- `404 Not Found`
- `204 No Content`
