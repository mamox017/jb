#TO PUT IN DB
from urllib import urlopen as uReq
from bs4 import BeautifulSoup as soup
import time
import re
import os
from pymongo import MongoClient
# pprint library is used to make the output look more pretty
from pprint import pprint

def main():
    # connect to MongoDB, change the << MONGODB URL >> to reflect your own connection string
    client = MongoClient("mongodb+srv://root:root@cluster0.bp9n0.mongodb.net/Cluster0?retryWrites=true&w=majority")
    db = client['jobs']
    # Issue the serverStatus command and print the results
    collection = db['jobs']

    wordset = []
    filename = "jobs.csv"
    f = open(filename, "w")
    headers = "Title, Company, Location, Experience, Link \n"

    print("Enter search page url:")
    base_url = raw_input()

    #opening connection and grabbing the page
    uClient = uReq(base_url)
    page_html = uClient.read()
    uClient.close()
    #html parsing
    page_soup = soup(page_html, "html.parser")
    numpages = page_soup.findAll("div", {"class" : "searchCountContainer"})
    jobs = numpages[0].text.strip().split(" ")
    numpages = int(jobs[3].replace(',','')) // 10
    print("Num pages: " + str(numpages))

    counter = 0

    for i in range(numpages-1):
        jobs_url = base_url + '&start='
        jobs_url += str(i)
        #opening connection and grabbing the page
        uClient = uReq(jobs_url)
        page_html = uClient.read()
        uClient.close()

        #html parsing
        page_soup = soup(page_html, "html.parser")

        #grab all divs with a class of result
        results = page_soup.findAll("div", {"class": "result"})
        #print(len(results)



        f.write(headers)

        for result in results:
            print("--------------- Job: " + str(counter) + "----------------")
            counter = counter + 1
            title = []
            company = []
            location = []
            summary = []
            link = []
            words = []

            try:
                title = result.a["title"]
                print(title)

                company = result.findAll('span', {'class':'company'})
                company_name = company[0].text.strip()
                print(company_name)

                try:
                    location = result.findAll('div', {'class':'location accessible-contrast-color-location'})
                    if location == []:
                            location = result.findAll('div', {'class':'location'})
                    if location == []:
                            location = result.findAll('span', {'class':'location'})
                    if location == []:
                            location = result.findAll('span', {'class':'location accessible-contrast-color-location'})

                    location_name = location[0].text.strip()
                    print(location_name)
                except IndexError:
                    location = "United States"
                    pass

                summary = result.findAll('div', {'class':'summary'})
                summary = summary[0].text.strip()
                summary = summary.replace('<p>', '')
                summary = summary.replace('<div class="summary">\n<ul style="list-style-type:circle;margin-top: 0px;margin-bottom: 0px;padding-left:20px;">\n<li style="margin-bottom:0px;">', '')
                summary = summary.replace('<div class="summary">\n<ul style="list-style-type:circle;margin-top: 0px;margin-bottom: 0px;padding-left:20px;">\n<li>', '')
                summary = summary.replace('</p>', '')
                summary = summary.replace('<strong>', '')
                summary = summary.replace('</strong>', '')
                summary = summary.replace('<li>', '')
                summary = summary.replace('</li>', '')
                summary = summary.replace('\\n', ' ')
                summary = summary.replace('<ul>', '')
                summary = summary.replace('</ul>', '')
                summary = summary.replace('<b>', '')
                summary = summary.replace('</b>', '')
                summary = summary.replace('</a>', '')
                summary = summary.replace('<h2>', '')
                summary = summary.replace('</h2>', '')
                summary = summary.replace('<h1>', '')
                summary = summary.replace('</h1>', '')
                summary = summary.replace('<h3>', '')
                summary = summary.replace('</h3>', '')
                summary = summary.replace('<h4>', '')
                summary = summary.replace('</h4>', '')
                summary = summary.replace('<h5>', '')
                summary = summary.replace('</h5>', '')
                summary = summary.replace('<h6>', '')
                summary = summary.replace('</h6>', '')
                summary = summary.replace('<h1>', '')
                summary = summary.replace('</h1>', '')
                summary = summary.replace('<ol>', '')
                summary = summary.replace('</ol>', '')
                summary = summary.replace('<em>', '')
                summary = summary.replace('</em>', '')
                summary = summary.replace('<a href=\\', '')
                summary = summary.replace('<img src=\\', '')
                summary = summary.replace('>', '')
                print(summary)

                link = result.a['href']
                job_link = ("https://www.indeed.com" + link)
                print(job_link)

                words = (str(title) + " " + str(company_name) + " " + str(location_name) + " " + str(summary) + " " + str(job_link)).lower()

                if("tech" in words or "Tech" in words or "software" in words or "Software" in words):
                    category = "Tech"
                elif("art" in words or "arts" in words or "Art" in words or "Arts" in words):
                    category = "Arts"
                elif("Business" in words or "business" in words or "Finance" in words or "financial" in words or "MBA" in words):
                    category = "Business"
                elif("Teach" in words or "teach" in words or "Professor" in words or "professor" in words):
                    category = "Education"
                elif("Engineer" in words or "engineer" in words):
                    category = "Engineering"
                elif("Patient" in words or "patient" in words or "Health" in words or "health" in words):
                    category = "Medical"
                elif("Restaurant" in words or "restaurant" in words or "Serve" in words or "serve" in words):
                    category = "Service Industry"
                else:
                    category = "Other"

                words += (" " + category).lower()

                if(words not in wordset):
                    counter = counter + 1
                    wordset.append(words)

                    doc_dict = {
                        'city' : unicode(location_name),
                        'state' : unicode(''),
                        'description' : unicode(summary),
                        'employer' : unicode(company_name),
                        'link' : unicode(job_link),
                        'title' : unicode(title),
                        'posted' : int(time.time() * 1000),
                        'id' : counter,
                        'category' : unicode(category),
                        'words' : unicode(words)
                    }

                    collection.insert(doc_dict)
                    print("--------------- INSERTED ABOVE DOCUMENT ----------------")
                    


            except:
                pass

    f.close()

main()
