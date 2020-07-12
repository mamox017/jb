import os
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import time

# Use the application default credentials
cred = credentials.Certificate('mootii-14ce1-8629922eca66.json')
firebase_admin.initialize_app(cred)

db = firestore.client()
doc_ref = db.collection(u'jobs')

log = open("se.txt")
fileContents = log.read()
eachLine = fileContents.split("}")
eachL = []

location = ""
desc = ""
employer = ""
link = ""
title = ""
words = ""

for i in range(len(eachLine)):
	eachLine[i] = eachLine[i].replace('<p>', '')
	eachLine[i] = eachLine[i].replace('<[<div class="summary">\n<ul style="list-style-type:circle;margin-top: 0px;margin-bottom: 0px;padding-left:20px;">\n<li>>', '')
	eachLine[i] = eachLine[i].replace('</p>', '')
	eachLine[i] = eachLine[i].replace('<strong>', '')
	eachLine[i] = eachLine[i].replace('</strong>', '')
	eachLine[i] = eachLine[i].replace('<li>', '')
	eachLine[i] = eachLine[i].replace('</li>', '')
	eachLine[i] = eachLine[i].replace('\\n', ' ')
	eachLine[i] = eachLine[i].replace('<ul>', '')
	eachLine[i] = eachLine[i].replace('</ul>', '')
	eachLine[i] = eachLine[i].replace('</a>', '')
	eachLine[i] = eachLine[i].replace('<h2>', '')
	eachLine[i] = eachLine[i].replace('</h2>', '')
	eachLine[i] = eachLine[i].replace('<h1>', '')
	eachLine[i] = eachLine[i].replace('</h1>', '')
	eachLine[i] = eachLine[i].replace('<h3>', '')
	eachLine[i] = eachLine[i].replace('</h3>', '')
	eachLine[i] = eachLine[i].replace('<h4>', '')
	eachLine[i] = eachLine[i].replace('</h4>', '')
	eachLine[i] = eachLine[i].replace('<h5>', '')
	eachLine[i] = eachLine[i].replace('</h5>', '')
	eachLine[i] = eachLine[i].replace('<h6>', '')
	eachLine[i] = eachLine[i].replace('</h6>', '')
	eachLine[i] = eachLine[i].replace('<h1>', '')
	eachLine[i] = eachLine[i].replace('</h1>', '')
	eachLine[i] = eachLine[i].replace('<ol>', '')
	eachLine[i] = eachLine[i].replace('</ol>', '')
	eachLine[i] = eachLine[i].replace('<em>', '')
	eachLine[i] = eachLine[i].replace('</em>', '')
	eachLine[i] = eachLine[i].replace('<a href=\\', '')
	eachLine[i] = eachLine[i].replace('<img src=\\', '')
	eachLine[i] = eachLine[i].replace('>', '')
	eachL.append(eachLine[i].split('",'))

count = 0
category = ""

for count in range(len(eachL)):
	words = ""
	for i in eachL[count]:
		
		if('"url": "' in i):
			
			after = i.index('"url": "')
			link = (i[after+8:])
		elif('"created_at": "' in i):
			after = i.index('"created_at": "')
			date = (i[after+15:])
		elif('"location": "' in i):
			after = i.index('"location": "')
			location = (i[after+13:])
			words += (" " + location).lower()
		elif('"company": "' in i):
			after = i.index('"company": "')
			employer = (i[after+12:])
			words += (" " + employer).lower()
		elif('"title": "' in i):
			after = i.index('"title": "')
			title = (i[after+10:])
			words += (" " + title).lower()
		elif('"description": "' in i):
			after = i.index('"description": "')
			desc = (i[after+16:])
			words += (" " + desc).lower()

	if("tech" in words or "Tech" in words or "software" in words or "Software" in words):
		category = "Tech"
	elif("art" in words or "arts" in words or "Art" in words or "Arts" in words):
		category = "Arts"
	elif("Business" in words or "business" in words or "Finance" in words or "financial" in words or "MBA" in words):
		category = "Business"
	elif("Teach" in words or "teach" in words or "Professor" in words or "professor" in words):
		category = "Education"
	elif("Engineer" in words or "engineer" in words or "" in words or "technology" in words):
		category = "Engineering"
	elif("Patient" in words or "patient" in words or "Health" in words or "health" in words):
		category = "Medical"
	elif("Restaurant" in words or "restaurant" in words or "Serve" in words or "serve" in words):
		category = "Service Industry"
	else:
		category = "Other"

	words += (" " + category).lower()

	doc_ref.document(str(count)).set({
		'city' : (location),
		'state' : '',
		'description' : (desc),
		'employer' : (employer),
		'link' : (link),
		'title' : (title),
		'posted' : int(time.time() * 1000),
		'id' : count,
		'category' : category,
		'words' : (words)
	})

	print("Completed record" + str(count))