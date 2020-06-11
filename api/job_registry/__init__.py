import markdown
import os
# Import the framework
from flask import Flask
from flask import g
# Import firebase
from firebase import firebase
#11.48
firebase = firebase.FirebaseApplication('https://your_storage.firebaseio.com', None)
result = firebase.get('/users', None)

# Create an insance of Flask
app = Flask(__name__)

def get_db():
    if 'db' not in g:
        g.db = connect_to_database()

    return g.db

@app.teardown_appcontext
def teardown_db():
    db = g.pop('db', None)

    if db is not None:
        db.close()

@app.route("/")
def index():
	"""Present some documentation"""

	# Open the README file
	with open(os.path.dirname(app.root_path) + '/README.md', 'r') as markdown_file:

		#R Read content of the file
		content = markdown_file.read()

		# Convert to HTML
		return markdown.markdown(content)
