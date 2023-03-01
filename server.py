#serve a flask server for the web app that will serve the files at . dir 

from flask import Flask, render_template, request, redirect, url_for, send_from_directory
import os
import sys
import json

import mimetypes
mimetypes.add_type('application/javascript', '.mjs')
app = Flask(__name__, template_folder='.', static_folder='.', static_url_path='')

@app.route('/')
def index():
    return render_template('./index.html')


app.run(host='localhost', port=8080, debug=True)