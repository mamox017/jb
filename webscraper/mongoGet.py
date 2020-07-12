#TO READ FROM DB
from pymongo import MongoClient
# pprint library is used to make the output look more pretty
from pprint import pprint

def main():
	# connect to MongoDB, change the << MONGODB URL >> to reflect your own connection string
	client = MongoClient("mongodb+srv://root:root@cluster0.bp9n0.mongodb.net/Cluster0?retryWrites=true&w=majority")
	db = client['jobs']
	# Issue the serverStatus command and print the results
	collection = db['jobs']
	cursor = collection.find({})
	for document in cursor:
	      print(document.get('title'))
