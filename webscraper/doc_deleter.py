import os
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import time

# Use the application default credentials
# Will cause error if not included with the file
# However for security reasons, will not include this json in the Github
cred = credentials.Certificate('mootii-14ce1-8629922eca66.json')
firebase_admin.initialize_app(cred)

db = firestore.client()
doc_ref = db.collection(u'jobs')

for i in range(500):
	doc_ref.document(str(i)).delete()
	print("deleted doc " + str(i))
